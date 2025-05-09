document.addEventListener('DOMContentLoaded', async () => {
  const { createClient } = supabase

  const supabaseUrl = 'https://qjtcemqqrdrykuxutuxd.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdGNlbXFxcmRyeWt1eHV0dXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MDE3NTksImV4cCI6MjA2MjM3Nzc1OX0.1k4vyH-GsvBYvvPARf6f0eKtOj3ZFjmjJIV1GsdorvE'
  const supabaseClient = createClient(supabaseUrl, supabaseKey)

  const form = document.getElementById('gameForm')
  const result = document.getElementById('result')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const data = {
      game: document.getElementById('game').value,
      nickname: document.getElementById('nickname').value,
      phone: document.getElementById('phone').value,
      date: document.getElementById('date').value
    }

    const { error } = await supabaseClient
      .from('pendaftaran')
      .insert([data])

    if (error) {
      result.textContent = 'Gagal mengirim data: ' + error.message
      result.style.color = 'red'
    } else {
      result.textContent = 'Data berhasil dikirim!'
      result.style.color = 'green'
      form.reset()
    }
  })
})

