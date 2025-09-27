/* Navigation Bar */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('open');
});

// Optional: Hamburger Animation
navToggle.addEventListener('click', () => {
  const hamburger = document.querySelector('.hamburger');
  hamburger.classList.toggle('open');
});

// Highlight Active Link on Scroll
window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 50; // Adjust for navbar height
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});



const navLinksItems = document.querySelectorAll('.nav-link');
// Close the menu when any nav link is clicked
navLinksItems.forEach(item => {
  item.addEventListener('click', function() {
    navToggle.classList.remove('active'); // Remove the active class from the hamburger icon
    navLinks.classList.remove('active');  // Hide the nav links
  });
});





const slides = document.querySelector('.slides');
const sliderBtn = document.querySelector('.explore-btn');

let index = 0; // Current slide index
const slideCount = document.querySelectorAll('.slide').length;
const slideWidth = slides.clientWidth;

// Auto-slide functionality
function autoSlide() {
  index = (index + 1) % slideCount;
  updateSlider();
}
let autoSlideInterval = setInterval(autoSlide, 3000);

// Update slider position
function updateSlider() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}




// Manual drag and touch functionality
// let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0;

// slides.addEventListener('mousedown', startDrag);
// slides.addEventListener('mouseup', stopDrag);
// slides.addEventListener('mouseleave', stopDrag);
// slides.addEventListener('mousemove', drag);
// slides.addEventListener('touchstart', startDrag);
// slides.addEventListener('touchend', stopDrag);
// slides.addEventListener('touchmove', drag);

// function startDrag(e) {
//   isDragging = true;
//   startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
//   clearInterval(autoSlideInterval); // Pause auto-slide on interaction
// }

// function stopDrag() {
//   isDragging = false;
//   const movedBy = currentTranslate - prevTranslate;

//   if (movedBy < -100 && index < slideCount - 1) index++;
//   if (movedBy > 100 && index > 0) index--;

//   updateSlider();
//   autoSlideInterval = setInterval(autoSlide, 3000); // Resume auto-slide
//   prevTranslate = index * -slides.clientWidth;
// }

// function drag(e) {
//   if (!isDragging) return;
//   const currentPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
//   currentTranslate = prevTranslate + currentPos - startPos;
//   slides.style.transform = `translateX(${currentTranslate}px)`;
// }

// Button to scroll to event schedule
sliderBtn.addEventListener('click', () => {
  document.querySelector('#schedule').scrollIntoView({ behavior: 'smooth' });
});

// Ensure the last slide loops back to the first
slides.addEventListener('transitionend', () => {
  if (index === slideCount - 1 && currentTranslate < 0) {
    slides.style.transition = 'none';
    index = 0;
    updateSlider();
    setTimeout(() => (slides.style.transition = 'transform 0.5s ease-in-out'), 0);
  }
});



// Countdown Timer
// Set the target date for the countdown (e.g., February 26, 2025)
const targetDate = new Date("Oct 31, 2025 00:00:00").getTime();

// Update the countdown every second
const interval = setInterval(function() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // If the countdown is finished, display a message
  if (distance < 0) {
    clearInterval(interval);
    document.getElementById("countdown").innerHTML = "Event Started!";
  }
}, 1000);



// Fade-in Animation on Scroll
const aboutText = document.querySelector('.fade-in');
window.addEventListener('scroll', () => {
  const rect = aboutText.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    aboutText.classList.add('visible');
  }
});



const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const shootSound = document.getElementById('shootSound');
    const explosionSound = document.getElementById('explosionSound');
    const masterControlButton = document.getElementById('master-control-btn');
    const popup = document.getElementById('popup');
    
    let isPlaying = true;

    // Fullscreen canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const maxFireworks = 5;
    const explosionSize = 100;
    const particleSpeed = 6;
    const colors = ['#FF69B4', '#33CC33', '#6666FF', '#FFFF66', '#FF9966'];

    function playSound(audio) {
        if (audio.paused) {
            audio.currentTime = 0; // Reset time to start
            audio.play().catch(error => {
                console.error("Error playing sound:", error);
            });
        }
    }

    function stopSound(audio) {
        audio.pause();
        audio.currentTime = 0; // Reset time to start
    }

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = canvas.height;
        const velocity = -Math.random() * 10 - 5;
        const height = Math.random() * (canvas.height / 2) + canvas.height / 4; 
        const firework = { x, y, velocity, height, exploded: false, particles: [] };
        fireworks.push(firework);
        if (isPlaying) {
            playSound(shootSound); // Play shoot sound when a firework is launched
        }
    }

    function createParticles(firework) {
        for (let i = 0; i < explosionSize; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocityX = Math.cos(angle) * (Math.random() * particleSpeed);
            const velocityY = Math.sin(angle) * (Math.random() * particleSpeed);
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 3 + 1;
            firework.particles.push({ x: firework.x, y: firework.y, velocityX, velocityY, size, alpha: 1, color });
        }
        if (isPlaying) {
            playSound(explosionSound); // Play explosion sound when the firework explodes
        }
    }

    function updateFireworks() {
        for (let i = fireworks.length - 1; i >= 0; i--) {
            const firework = fireworks[i];
            if (!firework.exploded) {
                firework.y += firework.velocity;
                if (firework.y < firework.height) {
                    firework.exploded = true;
                    createParticles(firework);
                }
            } else {
                for (let j = firework.particles.length - 1; j >= 0; j--) {
                    const particle = firework.particles[j];
                    particle.x += particle.velocityX;
                    particle.y += particle.velocityY;
                    particle.alpha -= 0.01;
                    particle.velocityX *= 0.98;
                    particle.velocityY *= 0.98;
                    if (particle.alpha <= 0) {
                        firework.particles.splice(j, 1);
                    }
                }
                if (firework.particles.length === 0) {
                    fireworks.splice(i, 1);
                }
            }
        }
        if (fireworks.length < maxFireworks) {
            createFirework();
        }
    }

    function drawFireworks() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const firework of fireworks) {
            if (!firework.exploded) {
                ctx.beginPath();
                ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#FFFFFF';
                ctx.fill();
            } else {
                for (const particle of firework.particles) {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${hexToRgb(particle.color).r}, ${hexToRgb(particle.color).g}, ${hexToRgb(particle.color).b}, ${particle.alpha})`;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = particle.color;
                    ctx.fill();
                }
            }
        }
    }

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
            : null;
    }

    function loop() {
        updateFireworks();
        drawFireworks();
        requestAnimationFrame(loop);
    }

    function startFireworks() {
        for (let i = 0; i < maxFireworks; i++) {
            createFirework();
        }
        loop();
    }

    function stopFireworks() {
        fireworks.length = 0; // Stop creating new fireworks
        canvas.style.display = 'none'; // Hide the fireworks canvas
        stopAllSounds(); // Ensure all sounds are stopped
    }

   // Function to stop all sounds
   function stopAllSounds() {
       stopSound(shootSound);
       stopSound(explosionSound);
   }

   masterControlButton.addEventListener('click', function () {
       isPlaying = false; // Prevent any new sounds from playing
       stopFireworks(); // Stop fireworks and sounds
       popup.style.display = 'none'; // Close the popup
   });

   // Show the popup and start the fireworks and sounds after 2 seconds
   setTimeout(function() {
       popup.style.display = 'block'; // Show the popup
       startFireworks(); // Start the fireworks
       playSound(shootSound); // Play the sound
   }, 2000);


// Function to play a sound
function playSound(audio) {
  if (!audio.paused) {
    audio.pause(); // Reset the sound if it's already playing
    audio.currentTime = 0;
  }
  audio.play();
}



// Show the button when scrolling down, and hide when at the top
window.onscroll = function () {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  
  // Check if the user has scrolled down 200px from the top
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollToTopBtn.style.display = 'block'; // Show the button
  } else {
    scrollToTopBtn.style.display = 'none'; // Hide the button
  }
};

// Scroll to the top when the button is clicked
document.getElementById('scrollToTopBtn').onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scroll
  });
};



document.addEventListener("DOMContentLoaded", function () {
  // Handle Day toggle
  const day1Toggle = document.getElementById("day1-toggle");
  const day2Toggle = document.getElementById("day2-toggle");
  const day1Timetable = document.getElementById("day1-timetable");
  const day2Timetable = document.getElementById("day2-timetable");

  // Function to toggle timetable visibility
  function toggleTimetable(day) {
      if (day === "day1") {
          day1Timetable.style.display = "block";
          day2Timetable.style.display = "none";
          day1Toggle.classList.add("active");
          day2Toggle.classList.remove("active");
      } else if (day === "day2") {
          day1Timetable.style.display = "none";
          day2Timetable.style.display = "block";
          day1Toggle.classList.remove("active");
          day2Toggle.classList.add("active");
      }
  }

  // Add event listeners for day toggle buttons
  day1Toggle.addEventListener("click", () => toggleTimetable("day1"));
  day2Toggle.addEventListener("click", () => toggleTimetable("day2"));

  // Initialize to show Day 1 timetable on page load
  toggleTimetable("day1");

  // Select all the audio elements in both Day 1 and Day 2
  const allSongs = document.querySelectorAll("audio");

  // Keep track of the currently playing song (if any)
  let currentSong = null;

  // Function to play/pause songs
  function toggleSong(audio) {
      if (audio.paused) {
          // If a song is already playing, pause it
          if (currentSong && currentSong !== audio) {
              currentSong.pause();
              currentSong.currentTime = 0; // Reset previous song to the beginning
          }

          // Play the selected song
          audio.play().catch(error => {
              console.log("Autoplay blocked or error occurred:", error);
          });

          // Update currentSong to the one being played
          currentSong = audio;
      } else {
          // If the song is playing, pause it
          audio.pause();
          audio.currentTime = 0; // Reset song to the beginning
          currentSong = null; // Reset currentSong when paused
      }
  }

  // Add event listeners for play/pause functionality
  allSongs.forEach(song => {
      const sliderItem = song.closest(".slider-item");
      if (sliderItem) {
          sliderItem.addEventListener("click", function (event) {
              event.stopPropagation(); // Prevent this click event from propagating to the document
              toggleSong(song);
          });
      }
  });

  // Add event listener for clicking outside of the timetable to pause any playing song
  document.addEventListener("click", function (event) {
      // If the click was outside the timetable (not in Day 1 or Day 2 timetable or their slider items)
      const isClickInsideTimetable = day1Timetable.contains(event.target) || day2Timetable.contains(event.target);
      const isClickOnSliderItem = event.target.closest(".slider-item");

      if (!isClickInsideTimetable && !isClickOnSliderItem && currentSong) {
          // Pause the currently playing song if the click was outside the timetable
          currentSong.pause();
          currentSong.currentTime = 0; // Reset the song
          currentSong = null; // Reset currentSong reference
      }
  });
});







const closeButton = document.getElementById('master-control-btn');
const audioPlayer1 = document.getElementById('audio-player1'); // Song1

// Show popup and play song1
function showPopup() {
    popup.style.display = 'block'; // Show the popup
    audioPlayer1.currentTime = 0; // Ensure it starts from the beginning
    audioPlayer1.play(); // Play song1
}

// Close popup and stop song1
function closePopup() {
    popup.style.display = 'none'; // Hide the popup
    audioPlayer1.pause(); // Stop song1
    audioPlayer1.currentTime = 0; // Reset song1 to the start
}

// Event listener for the Close button
closeButton.addEventListener('click', closePopup);

// Show popup after a delay and play song1 only when the popup appears
window.onload = function () {
    setTimeout(showPopup, 2000); // Display the popup 2 seconds after page load
};




document.addEventListener("DOMContentLoaded", function () {
  let audio = document.getElementById("backgroundSong");
  let closeButton = document.getElementById("master-control-btn");
  let popup = document.getElementById("popup");

  closeButton.addEventListener("click", function () {
      // Hide the popup
      popup.style.display = "none";

      // Try to play the audio
      let playPromise = audio.play();

      // Handle autoplay restrictions
      if (playPromise !== undefined) {
          playPromise.catch(error => {
              console.log("Autoplay prevented. User interaction required:", error);
              alert("Click anywhere on the page to enable audio.");
          });
      }
  });

  // Fix for autoplay issues: Allow clicking anywhere to play
  document.addEventListener("click", function () {
      if (audio.paused) {
          audio.play();
      }
  }, { once: true }); // Ensures it runs only once
});




// Sample artist data (replace with your local image paths)
const artists = {
  '2k24': [
    { name: 'Ankit Malakar', img: 'image/pa12k24.jpg', details: '', yt:'#', fb:'#', insta:'#' },
    { name: 'Anindita Chandra', img: 'image/pa22k24.png', details: '', yt:'#', fb:'#', insta:'#' },
    { name: 'Dj Lopa', img: 'image/pa32k24.jpeg', details: '', yt:'#', fb:'#', insta:'#' },
  ],
  '2k23': [
    { name: 'Rahul Dutta', img: 'image/pa12k23.jpeg', details: '', yt:'#', fb:'#', insta:'#' },
    { name: 'Gitashree Chowdhury', img: 'image/pa22k23.jpeg', details: '', yt:'#', fb:'#', insta:'#' }
  ],
  // '2k22': [
  //   { name: 'Artist X', img: 'images/artist7.jpg', details: 'Details about Artist X', yt:'#', fb:'#', insta:'#' }
  // ],
  // '2k21': [
  //   { name: 'Artist Y', img: 'images/artist8.jpg', details: 'Details about Artist Y', yt:'#', fb:'#', insta:'#' }
  // ],
  // '2k20': [
  //   { name: 'Artist Z', img: 'images/artist9.jpg', details: 'Details about Artist Z', yt:'#', fb:'#', insta:'#' }
  // ]
};

// Function to render artist cards for a given year
function showArtists(year) {
  const container = document.getElementById('artistContainer');
  container.innerHTML = '';
  
  artists[year].forEach(artist => {
    const card = document.createElement('div');
    card.classList.add('artist-card');
    
    card.innerHTML = `
      <img src="${artist.img}" alt="${artist.name}">
      <div class="artist-details">
        <h3>${artist.name}</h3>
        <p>${artist.details}</p>
        <div class="social-links">
          <a href="${artist.yt}" target="_blank">YT</a>
          <a href="${artist.fb}" target="_blank">FB</a>
          <a href="${artist.insta}" target="_blank">IG</a>
        </div>
      </div>
    `;
    
    container.appendChild(card);
    setTimeout(() => card.classList.add('show'), 50);
  });
}

// Year button click handling
document.querySelectorAll('.year-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    showArtists(btn.dataset.year);
  });
});

// Default show 2k24
showArtists('2k24');






// Auto-slide carousel
// const track = document.getElementById('carouselTrack');
// const container = track.parentElement;
// const cards = track.children;

// let position = 0;
// let direction = 1; // 1 = left, -1 = right
// const speed = 1; // pixels per frame

// function slideCarousel() {
//   const trackWidth = track.scrollWidth;
//   const containerWidth = container.offsetWidth;

//   // move the track
//   position -= direction * speed; // move left if direction=1

//   // Reverse direction at edges
//   if (position < containerWidth - trackWidth) {
//     direction = -1;
//   }
//   if (position > 0) {
//     direction = 1;
//   }

//   track.style.transform = `translateX(${position}px)`;
//   requestAnimationFrame(slideCarousel);
// }

// slideCarousel();

// const pastMembers = document.getElementById("past-members");
// let flowerInterval;

// // create a flower
// function createFlower() {
//   const flower = document.createElement("img");
//   flower.src = "image/wf.png"; // your flower image
//   flower.classList.add("flower");

//   // random horizontal position within section
//   const sectionWidth = pastMembers.offsetWidth;
//   flower.style.left = Math.random() * sectionWidth + "px";

//   // random size
//   const size = 20 + Math.random() * 40;
//   flower.style.width = size + "px";
//   flower.style.height = size + "px";

//   // random fall speed
//   const duration = 5 + Math.random() * 5;
//   flower.style.animationDuration = duration + "s";

//   pastMembers.appendChild(flower);

//   // remove flower after animation ends
//   setTimeout(() => flower.remove(), duration * 1000);
// }

// // use IntersectionObserver to detect when section is visible
// const observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       // start flowers
//       if (!flowerInterval) {
//         flowerInterval = setInterval(createFlower, 500);
//       }
//     } else {
//       // stop flowers when not visible
//       clearInterval(flowerInterval);
//       flowerInterval = null;
//     }
//   });
// }, { threshold: 0.1 });

// observer.observe(pastMembers);







const scrollContainer = document.querySelector('.scroll-container');

let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  scrollContainer.classList.add('active');
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('mouseleave', () => {
  isDown = false;
});

scrollContainer.addEventListener('mouseup', () => {
  isDown = false;
});

scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2; // speed factor
  scrollContainer.scrollLeft = scrollLeft - walk;
});

// --- Touch support ---
scrollContainer.addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('touchend', () => {
  isDown = false;
});

scrollContainer.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2;
  scrollContainer.scrollLeft = scrollLeft - walk;
});








document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".sponsor-track");
  const slider = document.querySelector(".sponsors-slider");

  if (!track || !slider) return;

  let position = 0;
  let direction = 1;
  const speed = 1; // pixels per frame
  const holdTime = 3000; // hold duration in ms

  const maxScroll = track.scrollWidth - slider.clientWidth;

  function slide() {
    if (maxScroll <= 0) return; // No scroll needed

    position += direction * speed;

    if (position >= maxScroll) {
      position = maxScroll;
      holdPause(() => (direction = -1));
    } else if (position <= 0) {
      position = 0;
      holdPause(() => (direction = 1));
    } else {
      track.style.transform = `translateX(-${position}px)`;
      requestAnimationFrame(slide);
    }
  }

  function holdPause(callback) {
    setTimeout(() => {
      callback();
      requestAnimationFrame(slide);
    }, holdTime);
  }

  slide();
});



