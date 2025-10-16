export async function updateProfile(data: {
  avatar: string
  name: string
  nickname: string
}) {
  const res = await fetch('/api/user/update', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
  return res.json()
}
