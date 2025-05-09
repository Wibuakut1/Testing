import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://gwgnshqsnobomnxaanmu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Z25zaHFzbm9ib21ueGFhbm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NTI2ODAsImV4cCI6MjA2MjMyODY4MH0.Ykn72UeowT1yImXM8GjbzSIbczWJf1PB1db16fWmWOQ'
const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', () => {
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

    const { error } = await supabase
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
