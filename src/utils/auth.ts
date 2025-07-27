import type { User } from '../types/user.type'

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const getProfileFromLS = (): User | null => {
  try {
    const result = localStorage.getItem('profile')

    // Kiểm tra thêm các trường hợp edge case
    if (!result || result === 'undefined' || result === 'null') {
      return null
    }

    return JSON.parse(result)
  } catch (error) {
    console.error('Error parsing profile from localStorage:', error)
    // Tự động xóa dữ liệu lỗi
    localStorage.removeItem('profile')
    return null
  }
}

export const setProfileToLS = (profile: User) => {
  try {
    localStorage.setItem('profile', JSON.stringify(profile))
  } catch (error) {
    console.error('Error saving profile to localStorage:', error)
  }
}
