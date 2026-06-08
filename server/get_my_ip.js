fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    console.log('\n\n========================================');
    console.log('YOUR PUBLIC IP ADDRESS IS: ' + data.ip);
    console.log('========================================\n\n');
  })
  .catch(err => console.error(err));
