document.getElementById('gameForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    game: document.getElementById('game').value,
    nickname: document.getElementById('nickname').value,
    phone: document.getElementById('phone').value,
    date: document.getElementById('date').value
  };

  const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
  const API_KEY = 'YOUR_SUPABASE_ANON_KEY';

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

  const resultText = document.getElementById('result');
  if (response.ok) {
    resultText.innerText = 'Data berhasil dikirim!';
    document.getElementById('gameForm').reset();
  } else {
    resultText.innerText = 'Gagal mengirim data!';
  }
});