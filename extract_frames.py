import cv2

DECIMATION = 128
MOVIE_NUMBER = 1

path = f"hp{MOVIE_NUMBER}.mp4"
cam = cv2.VideoCapture(path)

# frame 
currentframe = 0
  
while(True): 
      
    # reading from frame 
    ret,frame = cam.read() 
  
    if ret:
        if (frame_count := int(cam.get(cv2.CAP_PROP_POS_FRAMES))) % DECIMATION == 0: 
            print(f"Writing frame {frame_count}, {cam.get(cv2.CAP_PROP_POS_MSEC)/1000/60} minutes in")
            cv2.imwrite(f"./images/frame{MOVIE_NUMBER}-{frame_count}.jpg",
                        cv2.resize(frame,None,fx=0.5,fy=0.5)) 

    else: 
        break
  
# Release all space and windows once done 
cam.release() 
cv2.destroyAllWindows()