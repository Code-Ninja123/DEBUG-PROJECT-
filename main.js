song1 = "";
rightwristX = 0;
rightwristY = 0;
leftwristX = 0;
rightwristY = 0;

function preload()
{
    song1 = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on('pose' , gotPoses);
}
function modelLoaded()
{
    console.log('Posenet is initialized');
}

function gotPoses(result)
{
    if(result.length > 0)
    {
       console.log(result);
       scoreLeftWrist = result[0].pose.keypoints[9].score;
       leftwristX = result[0].pose.leftWrist.x;
       leftwristY = result[0].pose.leftWrist.y;
       rightwristX = result[0].pose.rightWrist.x;
       rightwristY = result[0].pose.rightWrist.y;
    }
}

function draw()
{
    image(video , 0 ,0 ,600 , 500);
    fill("#71eb34");
    stroke("#71eb34");

    if(scoreLeftWrist > 0.2){
        circle(leftwristX , leftwristY,20)
        Number_leftY = Number(leftwristY);//to convert left wrist Y string value to number 
        removeDecimal=floor(Number_leftY);// to remove the decimal value's of left wrist y
        volume = removeDecimal / 500; // to Set the Y axis value from 0 to 1 as volume ranges from 0 to 1 
        document.getElementById("volume").innerHTML ="Volume =" + volume;
        song1.setVolume(volume);
    }
}

function play()
{
    song1.play();
    song1.rate(1);
    song1.setVolume(1);
}