document.getElementById('gameForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    game: document.getElementById('game').value,
    nickname: document.getElementById('nickname').value,
    phone: document.getElementById('phone').value,
    date: document.getElementById('date').value
  };

  const SUPABASE_URL = 'https://gwgnshqsnobomnxaanmu.supabase.co';
  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Z25zaHFzbm9ib21ueGFhbm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NTI2ODAsImV4cCI6MjA2MjMyODY4MH0.Ykn72UeowT1yImXM8GjbzSIbczWJf1PB1db16fWmWOQ';

  const response = await fetch(\`\${SUPABASE_URL}/rest/v1/pendaftaran\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': API_KEY,
      'Authorization': 'Bearer ' + API_KEY,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(data)
  });

    if (response.ok) {
    window.location.href = "sukses.html"; // Redirect ke halaman sukses
  } else {
    document.getElementById('result').innerText = 'Gagal mengirim data!';
  }
});
