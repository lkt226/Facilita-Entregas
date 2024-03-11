const masking = {
  telphone: (telphone: string) => telphone.replace(/(\d{2})(\d{2})(\d{4,5})(\d{4})/, '+$1 ($2) $3-$4')
}

export default masking