'use client'
import { useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-xl">
      <label className="block">
        <span className="text-sm">Name</span>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mt-3">
        <span className="text-sm">Email</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mt-3">
        <span className="text-sm">Message</span>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          className="mt-1 w-full border rounded px-3 py-2"
          rows={5}
        />
      </label>

      <div className="mt-4 flex items-center gap-3">
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
          Send
        </button>
        {status === 'sending' && <span>Sending...</span>}
        {status === 'sent' && <span className="text-green-600">Sent. Thank you!</span>}
        {status === 'error' && <span className="text-red-600">Error sending message.</span>}
      </div>
    </form>
  )
}
