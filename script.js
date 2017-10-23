var running = false;

var breakLength = {
  time : 300,
  storeBreak : 300,
  minusTime : function(){
    breakLength.time = breakLength.time - 60;
    breakLength.storeBreak = breakLength.storeBreak - 60;
  },
  addTime : function(){
    breakLength.time = breakLength.time + 60;
    breakLength.storeBreak = breakLength.storeBreak + 60;
  }
};

var sessionLength = {
  time : 1500,
  storeSession : 1500,
  minusTime : function(){
    if(timer != undefined){
      clearInterval(timer);
    }
    sessionLength.time = sessionLength.time - 60;
    sessionLength.storeSession = sessionLength.storeSession - 60;
  },
  addTime : function(){
    if(timer != undefined){
      clearInterval(timer);
    }
    sessionLength.time = sessionLength.time + 60;
    sessionLength.storeSession = sessionLength.storeSession + 60;
  },
  startClock : function(){
    if(running == false){
        running = true;
        timer = setInterval(function(){
        if(sessionLength.time == 0){
          breakTimer = setInterval(function(){
            if(breakLength.time < 1){
              sessionLength.time = sessionLength.storeSession;
              clearInterval(breakTimer);
              breakLength.time = breakLength.storeBreak;
              return false;
            }
            breakDown();
          },1000);

        }
        countDown();
      },1000);
    }
    
  }
};

var timer = false


//Counting Down seconds of Session and Break
function countDown(){
  sessionLength.time = sessionLength.time -1;
  $('#pomClock').html(converTime(sessionLength.time));
};

function breakDown(){
  breakLength.time = breakLength.time -1;
  $('#pomClock').html(converTime(breakLength.time));
}

//Time Conversion
function converTime(val){
  var min = Math.floor(val / 60);
  var secs = val % 60;
  return min + ':' + secs;
}

$(function(){
  //Session Time Changes
  $('#sessAdd').click(function(){
      sessionLength.addTime();
      $('#sessNum').html(converTime(sessionLength.time));
      $('#pomClock').html(converTime(sessionLength.time));
    }
    );
  $('#sessSub').click(function(){
      sessionLength.minusTime();
      $('#sessNum').html(converTime(sessionLength.time));
      $('#pomClock').html(converTime(sessionLength.time));
    }
    );
  $('#sessNum').html(converTime(sessionLength.time));
  
  //Break Time Changes
  $('#breakAdd').click(function(){
      breakLength.addTime();
      $('#breakNum').html(converTime(breakLength.time));
    }
    );
  $('#breakSub').click(function(){
      breakLength.minusTime();
      $('#breakNum').html(converTime(breakLength.time));
    }
    );
  $('#breakNum').html(converTime(breakLength.time));
  
  //Pomdoro Clock 
  $('#pomClock').html(converTime(sessionLength.time));
  $('#pomClock').click(function(){
    if(running == true){
      clearInterval(timer);
      running = false;
      return false;
    }
    sessionLength.startClock();
  });
  $('#reset').click(function(){
    clearInterval(timer);
    running = false;
    sessionLength.time = sessionLength.storeSession;
    breakLength.time = breakLength.storeBreak;
    $('#sessNum').html(converTime(sessionLength.time));
    $('#pomClock').html(converTime(sessionLength.time));
    $('#breakNum').html(converTime(breakLength.time));
    if(breakTimer){
      clearInterval(breakTimer);
    };
  });
});