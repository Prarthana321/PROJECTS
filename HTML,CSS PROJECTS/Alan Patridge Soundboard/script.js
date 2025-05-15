const samples = [
    { name: "Ah-Ha", file: "audio/ah-ha.mp3" },
    { name: "Back of the net", file: "audio/back-of-the-net.mp3" },
    { name: "Bang out of order", file: "audio/bangoutoforder.mp3" },
    { name: "Dan", file: "audio/dan.mp3" },
    { name: "Email of the evening", file: "audio/emailoftheevening.mp3" },
    { name: "Hello Partridge", file: "audio/hellopartridge.mp3" },
    { name: "I ate a scotch egg", file: "audio/iateascotchegg.mp3" },
    { name: "I'm confused", file: "audio/imconfused.mp3" },
  ];
  
  const grid = document.getElementById("sample-grid");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  
  let currentPage = 0;
  const samplesPerPage = 9;
  
  // Store audio objects globally so they persist
  const audioMap = {};
  
  function loadSamples(page) {
    grid.innerHTML = "";
    const start = page * samplesPerPage;
    const end = Math.min(start + samplesPerPage, samples.length);
  
    for (let i = start; i < end; i++) {
      const sample = samples[i];
  
      // Reuse or create a new audio object
      let audio = audioMap[sample.name];
      if (!audio) {
        audio = new Audio(sample.file);
        audio.loop = true;
        audioMap[sample.name] = audio;
      }
  
      const div = document.createElement("div");
      div.className = "sample";
      div.innerHTML = `<div>${i + 1}. <strong>${sample.name}</strong><br><small>Loading...</small></div>`;
  
      div.addEventListener("click", () => {
        audio.currentTime = 0;
        audio.play();
      });
  
      audio.addEventListener("loadedmetadata", () => {
        div.querySelector("small").innerText = `${audio.duration.toFixed(2)} sec`;
      });
  
      grid.appendChild(div);
    }
  
    prevBtn.style.display = page === 0 ? "none" : "inline-block";
    nextBtn.style.display = end >= samples.length ? "none" : "inline-block";
  }
  
  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      loadSamples(currentPage);
    }
  });
  
  nextBtn.addEventListener("click", () => {
    if ((currentPage + 1) * samplesPerPage < samples.length) {
      currentPage++;
      loadSamples(currentPage);
    }
  });
  
  // Text to speech
  document.getElementById("speak-btn").addEventListener("click", () => {
    const text = document.getElementById("tts-input").value;
    const utter = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utter);
  });
  
  // Initial load
  loadSamples(currentPage);
  