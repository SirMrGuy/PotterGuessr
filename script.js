movie_names = ['zero index',
               'Sorceror\'s Stone',
               'Chamber of Secrets',
               'Prisoner of Azkaban',
               'Goblet of Fire',
               'Order of the Phoenix',
               'Half-Blood Prince',
               'Deathly Hallows Part 1',
               'Deathly Hallows Part 2']

decimation = 256
movie_lengths = [0,856,0,0,0,0,0,0,0]
runtime_mins = []
movie_lengths.forEach((element) => runtime_mins.push(Math.floor(element*decimation/24/60)+1))
guessed_state = false

function generateSlider() {
    slider = document.getElementById('slider')
    slider.min = 1
    slider.max = sum(runtime_mins)-1
    slider.value = 1
    slider.oninput = sliderOutput
}

function guessedMovie(val) {
    movie_number = 0
    while(sum(runtime_mins.slice(0,movie_number+1)) <= val) movie_number++
    return movie_number
}

function sliderOutput() {
    if(guessed_state) return
    minutes = this.value-sum(runtime_mins.slice(0,guessedMovie(this.value)))
    document.getElementById('slider-output').innerHTML = movie_names[movie_number]+', '+Math.floor(minutes/60)+':'+String(minutes%60).padStart(2,'0')
}

function sum(arr) {
    return arr.reduce((a, b) => a + b, 0)
}

function getFrame() {
    global_frame = Math.floor(sum(movie_lengths)*Math.random())
    movie_number = 0
    while(sum(movie_lengths.slice(0,movie_number+1)) <= global_frame) movie_number++

    movie_frame = global_frame-sum(movie_lengths.slice(0,movie_number))

    document.getElementById('frame').src = 'images/frame'+movie_number+'-'+(256*(1+movie_frame))+'.jpg'
    return [movie_number,movie_frame]
}

function guess() {
    if(guessed_state) return
    //guessed_state = true
    slider = document.getElementById('slider')
    results = document.getElementById('results')
    goal_value = sum(runtime_mins.slice(0,frame_data[0]))+Math.floor(frame_data[1]*decimation/24/60)

    results_string = ""
    score = 0

    correct_movie = guessedMovie(slider.value)==frame_data[0]
    if(correct_movie) {
        results_string += "2000 points for getting the correct movie.<br>"
        score += 2000
    }
    else {
        results_string += "Wrong movie; the correct movie was "+movie_names[frame_data[0]]+".<br>"
    }

    time_diff = slider.value-goal_value
    if(time_diff == 0) {
        results_string += "Your time is exactly correct! "
    }
    else if(time_diff > 0) {
        results_string += "Your time is "+time_diff+" minute(s) too late. "
    }
    else {
        results_string += "Your time is "+(-time_diff)+" minute(s) too early. "
    }
    time_score = Math.floor(3000*Math.pow(0.5,Math.pow(Math.abs(time_diff)/30,1.4)))
    results_string += time_score+" points.<br>"
    score += time_score

    results_string += "Total: "+score

    results.innerHTML = results_string
}

function newFrame() {
    guessed_state = false
    slider = document.getElementById('slider')
    results = document.getElementById('results')
    slider.dispatchEvent(new Event('input'))
    results.innerHTML = 'Guess to receive a score.'
    frame_data = getFrame()
}

generateSlider()

frame_data = getFrame()