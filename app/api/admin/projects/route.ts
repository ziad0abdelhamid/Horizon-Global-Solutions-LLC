import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const projectsFile = path.join(process.cwd(), "app", "data", "projects.ts");

interface Project {
  id: string;
  title: string;
  titleAr?: string;
  desc: string;
  descAr?: string;
  image: string;
  category: string[] | string;
  link?: string;
  details?: string;
  detailsAr?: string;
  images?: string[];
  technologies?: string[];
  role?: string;
  duration?: string;
  challenges?: string;
  keyLearnings?: string;
}

function parseProjectsArray(projectsData: string): Project[] {
  const startIdx = projectsData.indexOf("export const projects: Project[]");
  if (startIdx === -1) {
    console.error("Could not find 'export const projects' in file");
    return [];
  }

  const bracketStart = projectsData.indexOf("[", startIdx);
  if (bracketStart === -1) {
    console.error("Could not find opening bracket");
    return [];
  }

  let bracketCount = 0;
  let bracketEnd = -1;
  for (let i = bracketStart; i < projectsData.length; i++) {
    if (projectsData[i] === "[") bracketCount++;
    if (projectsData[i] === "]") {
      bracketCount--;
      if (bracketCount === 0) {
        bracketEnd = i;
        break;
      }
    }
  }

  if (bracketEnd === -1) {
    console.error("Could not find matching closing bracket");
    return [];
  }

  const projectsJson = projectsData.substring(bracketStart, bracketEnd + 1);
  return JSON.parse(projectsJson);
}

function generateProjectsFile(projects: Project[]) {
  const content = `export interface Project {
  id: string;
  title: string;
  titleAr?: string;
  desc: string;
  descAr?: string;
  image: string;
  category: string[] | string;
  link?: string;
  details?: string;
  detailsAr?: string;
  images?: string[];
  technologies?: string[];
  role?: string;
  duration?: string;
  challenges?: string;
  keyLearnings?: string;
}

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};
`;
  return content;
}

// GET projects
export async function GET(req: NextRequest) {
  try {
    const projectsData = fs.readFileSync(projectsFile, "utf-8");
    const projects = parseProjectsArray(projectsData);
    return NextResponse.json({ projects });
  } catch (err) {
    console.error("Error fetching projects:", err);
    return NextResponse.json(
      { projects: [], error: "Failed to fetch projects", details: String(err) },
      { status: 500 },
    );
  }
}

// POST - Add new project
export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const projectData = await req.json();

    // Read existing projects
    const projectsData = fs.readFileSync(projectsFile, "utf-8");
    let projects = parseProjectsArray(projectsData);

    // Add new project
    const newProject: Project = {
      ...projectData,
      id:
        projectData.id || projectData.title.toLowerCase().replace(/\s+/g, "-"),
    };

    projects.push(newProject);

    // Write updated projects
    const newContent = generateProjectsFile(projects);
    fs.writeFileSync(projectsFile, newContent);

    return NextResponse.json({ success: true, project: newProject });
  } catch (err) {
    console.error("Error adding project:", err);
    return NextResponse.json(
      { error: "Failed to add project" },
      { status: 500 },
    );
  }
}

// PUT - Update project
export async function PUT(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...projectData } = await req.json();

    const projectsData = fs.readFileSync(projectsFile, "utf-8");
    let projects = parseProjectsArray(projectsData);

    const projectIndex = projects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    projects[projectIndex] = { ...projects[projectIndex], ...projectData };

    const newContent = generateProjectsFile(projects);
    fs.writeFileSync(projectsFile, newContent);

    return NextResponse.json({
      success: true,
      project: projects[projectIndex],
    });
  } catch (err) {
    console.error("Error updating project:", err);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

// DELETE - Delete project
export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    const projectsData = fs.readFileSync(projectsFile, "utf-8");
    let projects = parseProjectsArray(projectsData);

    projects = projects.filter((p) => p.id !== id);

    const newContent = generateProjectsFile(projects);
    fs.writeFileSync(projectsFile, newContent);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting project:", err);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
