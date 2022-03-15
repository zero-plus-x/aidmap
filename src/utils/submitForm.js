const submitForm = (event, data) => {
  return new Promise((resolve) => {
    event.preventDefault()
    const form = event.target

    const url = form.action
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve()
      }
    }

    const encoded = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join('&')

    xhr.send(encoded)
  })
}

export default submitForm
