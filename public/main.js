var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const videoGameName = this.parentNode.parentNode.childNodes[1].innerText
        const gameSystem = this.parentNode.parentNode.childNodes[3].innerText
        const upVote = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('thumbsUp', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'videoGameName': videoGameName,
            'gameSystem': gameSystem,
            'upVote':upVote
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

Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    const videoGameName = this.parentNode.parentNode.childNodes[1].innerText
    const gameSystem = this.parentNode.parentNode.childNodes[3].innerText
    const upVote = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('thumbsDown', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'videoGameName': videoGameName,
        'gameSystem': gameSystem,
        'upVote':upVote
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
