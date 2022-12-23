const select = document.querySelector('#select')
const firstInput = document.querySelector('#first-input'),
      secondInput = document.querySelector('#second-input')
const path = 'data.json'
const selectedValue = document.querySelector('#selected-value')

const req = new XMLHttpRequest()
req.open('GET', path)
req.setRequestHeader('Content-Type', 'application/json')
req.send()
req.addEventListener('load', () => {
    const requestResponse = JSON.parse(request.response)
    for (const key in requestResponse) {
        const option = document.createElement('option')
        option.textContent = key
        option.value = requestResponse[key]
        select.append(option)
        selectedValue.textContent = select.options[select.selectedIndex].textContent
    }
})

const convertCurrency = () => {
  const selectedCurrency = select.options[select.selectedIndex].textContent
  const conversionRate = select.options[select.selectedIndex].value
  if (selectedCurrency === 'som') {
    secondInput.value = (firstInput.value / conversionRate).toFixed(2)
  } else {
    firstInput.value = (secondInput.value * conversionRate).toFixed(2)
  }
  selectedValue.textContent = selectedCurrency
}

firstInput.addEventListener('input', convertCurrency)
secondInput.addEventListener('input', convertCurrency)
select.addEventListener('input', convertCurrency)