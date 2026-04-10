"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { projects, Project } from "@/app/data/projects";
import HeroWithNavbar from "@/components/Navbar";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project: Project | undefined = projects.find((p) => p.id === id);
  const t = useTranslations('projectsDetail');
  const router = useRouter();

  useEffect(() => {
    if (!project || !project.hasPrivacyPolicy) {
      router.push(`/projects/${id}`);
    }
  }, [project, id, router]);

  if (!project || !project.hasPrivacyPolicy) return null;

  const renderPrivacyPolicyContent = () => {
    switch (id) {
      case "add-qrcode-to-pdf":
        return (
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Privacy Policy for Add QR Code to PDF</h2>
              <p className="text-sm text-gray-400 mb-6">Last updated: April 10, 2026</p>
              <p className="leading-relaxed">
                At Add QR Code to PDF, we are committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our mobile application.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3">Information We Collect</h3>
              <p className="leading-relaxed mb-4">
                <strong className="text-[#D4AF37]">We do not collect any personal information.</strong> Our app operates entirely on your device and does not transmit, store, or share any data with external servers or third parties.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h3>
              <p className="leading-relaxed mb-4">
                The app allows you to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Upload PDF documents from your device</li>
                <li>Generate QR codes that can be added to your PDF documents</li>
                <li>Save the modified PDF documents to your device</li>
                <li>Share the generated PDF files through various sharing options (WhatsApp, email, etc.)</li>
              </ul>
              <p className="leading-relaxed mt-4">
                All processing happens locally on your device. We do not have access to the PDF files you upload or modify.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3">Data Storage</h3>
              <p className="leading-relaxed">
                All documents and QR codes are processed and stored locally on your device. We do not maintain any cloud storage or backup of your files. You have complete control over your data and can delete files at any time through your device&apos;s file management system.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3">Third-Party Services</h3>
              <p className="leading-relaxed">
                Our app does not use any third-party analytics, advertising, or tracking services. We do not integrate with any external services that would collect your data.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3">Data Sharing</h3>
              <p className="leading-relaxed">
                <strong className="text-[#D4AF37]">We do not share any data</strong> because we do not collect any data. When you choose to share a generated PDF through the app&apos;s sharing functionality (e.g., WhatsApp, email), you are directly sharing the file through your device&apos;s native sharing features. We are not involved in this process.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3">Permissions</h3>
              <p className="leading-relaxed mb-4">
                The app requires the following permissions to function:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Storage Access:</strong> To read PDF files from your device and save modified PDF files</li>
              </ul>
              <p className="leading-relaxed mt-4">
                These permissions are used solely for the app&apos;s core functionality and are never used to collect or transmit data.
              </p>
            </section>

            {/* <section>
              <h3 className="text-xl font-semibold text-white mb-3">Children's Privacy</h3>
              <p className="leading-relaxed">
                Our app does not collect any information from anyone, including children under the age of 13. The app can be safely used by individuals of all ages.
              </p>
            </section> */}

            {/* <section>
              <h3 className="text-xl font-semibold text-white mb-3">Changes to This Privacy Policy</h3>
              <p className="leading-relaxed">
                We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="font-semibold text-white">Horizon Global Solutions LLC</p>
                <p>Email: contact@horizonglobalsolutions.com</p>
                <p>Phone: +20 115 583 5423</p>
                <p>Location: Egypt</p>
              </div>
            </section> */}

            <section className="pt-8 border-t border-white/20">
              <p className="text-sm text-gray-400 italic">
                By using Add QR Code to PDF, you acknowledge that you have read and understood this Privacy Policy. Since we do not collect any data, there is no data processing consent required.
              </p>
            </section>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-400">Privacy policy not available for this project.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full min-h-screen scroll-smooth bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e]">
      <HeroWithNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 font-['Sono'] relative">
        {/* Decorative Background */}
        <div className="fixed inset-0 opacity-5 pointer-events-none -z-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 pt-24 pb-20">
          {/* Header Section with Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Link
              href={`/projects/${id}`}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-[#D4AF37] font-semibold hover:text-yellow-300 transition-all bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:border-[#D4AF37]/50 hover:bg-white/10"
            >
              ← {t("backToProject")}
            </Link>
          </motion.div>

          {/* Privacy Policy Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl"
          >
            {renderPrivacyPolicyContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
