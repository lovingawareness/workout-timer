var speakText = function(text) {
  var voices = window.speechSynthesis.getVoices()
/* 
  for(var i in voices) {
    console.log(`${i}: ${voices[i].name}`)
  }
*/
  var msg = new SpeechSynthesisUtterance()
  // On Mac Google Chrome, this is Google US English
  //  msg.voice = voices[49]
  msg.text = text
  msg.lang = 'en'
//  msg.rate = 0.8
  speechSynthesis.speak(msg)
}

var app = new Vue({
  el: '#app',
  data: {
    defaults: {
      repsTotal: 8,
      workoutTimerLength: 20,
      restTimerLength: 10
    },
    timerStarted: false,
    timerFinished: false,
    inWorkout: true,
    repsTotal: null,
    workoutTimerLength: null, // in seconds, humans don't need milliseconds
    restTimerLength: null,
    timeLeft: null,
    rep: 1
  },
  methods: {
    startTimer: function() {
      speakText('go!')
      var v = this
      v.timerStarted = true
      setInterval(() => {
        if(v.rep <= v.repsTotal && v.timerStarted && !v.timerFinished) {
          if(v.timeLeft <= 0) {
            // If the timer has expired, then reset it and advance the counters
            if(v.inWorkout) {
              // now we go to the rest state
              v.inWorkout = false
              speakText('rest')
              // reset to the time for rest
              v.timeLeft = v.restTimerLength
            } else {
              // we've been resting, next is the workout again
              v.inWorkout = true
              v.timeLeft = v.workoutTimerLength
              // Only increase rep after both the workout and rest have been done
              // Rest is essential!
              if(v.rep == v.repsTotal) {
                v.timerFinished = true
                speakText('done')
              } else {
                v.rep += 1
                speakText('work out')
              }
            }
          } else {
            // Timer is already active, let's count down
            v.timeLeft -= 1
          }
        }
      }, 1000)
    }
  },
  mounted: function() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    this.repsTotal = urlParams.get('n') || this.defaults.repsTotal
    this.workoutTimerLength = urlParams.get('w') || this.defaults.workoutTimerLength
    this.restTimerLength = urlParams.get('r') || this.defaults.restTimerLength
    this.timeLeft = this.workoutTimerLength
  }
})