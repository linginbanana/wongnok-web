'use client'

import { useState } from 'react'
import { updateProfile } from '@/services/user.service'

export default function ProfileForm() {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')

  const handleSubmit = async () => {
    await updateProfile({ avatar, name, nickname })
    alert('บันทึกข้อมูลเรียบร้อยแล้ว')
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="ชื่อ"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="ชื่อเล่น"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="text"
        placeholder="ลิงก์รูป Avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <button onClick={handleSubmit}>บันทึก</button>
    </div>
  )
}
