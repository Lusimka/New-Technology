const day = 24.0 * 60 * 60; // тривалість земного дня в секундах
const dt = day / 3; // крок інтегрування
const G = 6.67e-11; // гравітаційна стала

AFRAME.registerComponent('planet', {
  schema: {
    name: { type: 'string', default: "" },
    dist: { type: 'number', default: 0 },
    mass: { type: 'number', default: 0 },
    T: { type: 'number', default: 0 },

    v: { type: 'array', default: [0, 0, 0] },
    a: { type: 'array', default: [0, 0, 0] },
    pos: { type: 'array', default: [0, 0, 0] }
  },

  init: function () {
    this.data.T *= day; // з днів у секунди
    this.data.pos[0] = this.data.dist;
    this.el.setAttribute('position', `${this.data.dist / 1e9} 0 0`);
    if (this.data.T !== 0) {
      this.data.v[1] = 2 * Math.PI * this.data.dist / this.data.T;
    }
  }
});

AFRAME.registerComponent('main', {
  init: function () {
    this.solar_system = document.querySelectorAll('[planet]');
  },

  tick: function () {
    for (let i = 0; i < this.solar_system.length; i++) {
      let planet_i = this.solar_system[i].getAttribute('planet');
      planet_i.a = [0, 0, 0];

      for (let j = 0; j < this.solar_system.length; j++) {
        if (i === j) continue;

        let planet_j = this.solar_system[j].getAttribute('planet');
        let dp = planet_j.pos.map((v, k) => v - planet_i.pos[k]);
        let r = Math.hypot(...dp);
        for (let k = 0; k < 3; k++) {
          planet_i.a[k] += G * planet_j.mass * dp[k] / Math.pow(r, 3);
        }
      }

      for (let k = 0; k < 3; k++) {
        planet_i.v[k] += planet_i.a[k] * dt;
        planet_i.pos[k] += planet_i.v[k] * dt;
      }

      this.solar_system[i].setAttribute('position',
        planet_i.pos.map(x => x / 1e9).join(' ')
      );
    }
  }
});
