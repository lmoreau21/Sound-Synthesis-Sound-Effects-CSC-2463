
let notes = ['F4','D4','A3','D4','F4','D4','A3','D4',   'F4','C4','A3','C4','F4','C4','A3','C4',     'E4','C#4','A3','C#4','E4','C#4','A3','C#4','E4','C#4','A3','C#4','E4','C#4','A3','C#4', 'D4','E4','F4', 'A4','G4','A4','C4',  'D4','E4','F4','E4',    'G4', 'A4','G4','F4',      'F4','F4','F4','A4','A4','G4','F4',  'A4','A4','A4','G4','A4','G4','F4',  'F4','F4','F4','A4','A4','G4','F4',   'A4','A4','A4','C#5','C#5','C#5',    'F4','F4','F4','A4','A4','G4','F4',  'A#4','A#4','A#4','G4','C4','A3','C#4', 'F4','D4','F4','A4','E4','C#4','A3','C#4','D4','D4','D4','F4'];
let soundEffect = ['E4','G4', 'E5','C5','D5','G5'];
let seq1,seq2;
let Dminor = ['D4','F4','A4'];
let Fmajor = ['F4','A4','C4'];
let Amajor = ['A4','C#4','E4'];
let Bfmajor = ['Bb4','D4','F4'];
let Cmajor = ['C4','E4','G4'];
let Aminor = ['A4','C4','E4'];

let chords = [Dminor,Fmajor,Amajor,Dminor,Fmajor,Bfmajor,Cmajor,Aminor,Dminor,Fmajor,Bfmajor,Cmajor,Amajor,Dminor,Fmajor,Cmajor,Amajor,Dminor];
let index = 0;
let bg;
let beginSketch = false;
Tone.Transport.start();
function setup(){
  createCanvas(600,300);
   
  background('lightblue')
  sound = new Tone.Synth({
    filter : {
      type: "lowpass"
    },
    oscillator:{
      type:'sine'
    },
    envelope:{
      attack:4
    }
   }).toDestination();

   synth2 = new Tone.Synth({
    filter : {
      type: "highpass"
    },
    oscillator:{
      type:'triangle'
    }

   }).toDestination();

   bg = loadImage('game.jpg');
   
  //  seq = new Tone.Sequence(function(){
  //   synth.triggerAttackRelease(chords[index], 2.2);
  //   index++;
  //   if(index>=chords.length) index =0;
  // }, chords, 6.6);
  seq1 = new Tone.Sequence(function(){
    sound.triggerAttackRelease(soundEffect[index], .2);  
    index++;
    if(index>=soundEffect.length){ index=0;seq1.stop();beginSketch=false;}
  }, soundEffect, .2);
  
  seq2 = new Tone.Sequence(function(timer,note){
    synth2.triggerAttackRelease(note, .22);  
    console.log(note);
    }, notes, .22);
  Tone.Transport.start();

  Tone.start(); //You need to interact with your canvas and tell Tone to start before audio begins playing.
  //seq1.start();
  seq2.start();
  
}

function draw(){
  background("lightblue");
  textAlign(CENTER);
  text("Click to Play Sound Effect", width/2, height/2);
  
  if (mouseIsPressed) {
    background(bg);
    beginSketch = true;
    seq1.start();
  }
  if(beginSketch){
    background(bg);
  }
 
}