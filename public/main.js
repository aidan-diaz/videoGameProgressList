var favorite = document.getElementsByClassName("fa-star-o");
var unfavorite = document.getElementsByClassName("fa-star");
var trash = document.getElementsByClassName("fa-trash");

Array.from(favorite).forEach(function(element) {
      element.addEventListener('click', function(){
        const videoGameName = this.parentNode.parentNode.childNodes[1].innerText
        const gameSystem = this.parentNode.parentNode.childNodes[3].innerText
        fetch('favorite', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'videoGameName': videoGameName,
            'gameSystem': gameSystem
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(unfavorite).forEach(function(element) {
  element.addEventListener('click', function(){
    const videoGameName = this.parentNode.parentNode.childNodes[1].innerText
    const gameSystem = this.parentNode.parentNode.childNodes[3].innerText
    fetch('unfavorite', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'videoGameName': videoGameName,
        'gameSystem': gameSystem
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const videoGameName = this.parentNode.parentNode.childNodes[1].innerText
        const gameSystem = this.parentNode.parentNode.childNodes[3].innerText
        fetch('deleteGame', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'videoGameName': videoGameName,
            'gameSystem': gameSystem
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
