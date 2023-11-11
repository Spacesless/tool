import copy from 'copy-to-clipboard'

export function useCopy() {
  const handleCopy = (text: string) => {
    copy(text, {
      message: '请按#{key}复制'
    })
  }

  return {
    handleCopy
  }
}
