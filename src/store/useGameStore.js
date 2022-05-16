import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const useGameStore = defineStore('gameStore', {
  state: () => {
    return {
      colorsClasses: [
        'red-square',
        'orange-square',
        'amber-square',
        'lime-square',
        'emerald-square',
        'cyan-square',
        'blue-square',
        'indigo-square',
        'purple-square',
      ],
      shuffledColorsClasses: [],
      previewColor: 'none',
      colorStack: [],
      userPickedColorStack: [],
      records: [],
      countOfRounds: 0,
      lifes: 3,
      isPreview: false,
      isGameRunning: false,
      timeouts: [],
    };
  },

  getters: {
    getColors(state) {
      return state.colorsClasses.map((color) => color.split('-')[0]);
    },
    getShuffledColors(state) {
      return state.shuffledColorsClasses.map((color) => color.split('-')[0]);
    },
  },

  actions: {
    //#region color actions

    pickRandomColor() {
      const colors = this.getShuffledColors;
      const colorIndex = Math.floor(Math.random() * colors.length);

      this.colorStack.push(colors[colorIndex]);
    },

    pickColor(color) {
      this.userPickedColorStack.push(color);
    },

    shuffleColors() {
      this.shuffledColorsClasses = [];
      const colors = JSON.parse(JSON.stringify(this.colorsClasses));

      for (let i = 0; i < 9; i++) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        colors.splice(colorIndex, 1);
        this.shuffledColorsClasses.push(color);
      }
    },

    //#endregion

    //#region game parameters control actions

    clearTimeouts() {
      this.timeouts.map(clearTimeout);
      this.timeouts = [];
    },

    clearValues() {
      this.clearTimeouts();
      this.colorStack = [];
      this.userPickedColorStack = [];
      this.countOfRounds = 0;
      this.previewColor = 'none';
      this.isPreview = false;
    },

    startGame() {
      this.clearValues();
      this.isGameRunning = true;
      this.lifes = 3;
      this.startNewRound();
    },

    endGame() {
      this.saveRecords();
      this.clearValues();
      this.isGameRunning = false;
    },

    removeLife() {
      this.lifes -= 1;
      this.repeatRound();
    },

    //#endregion

    // #region rounds control actions

    startNewRound() {
      this.shuffleColors();
      this.countOfRounds += 1;
      this.userPickedColorStack = [];

      this.clearTimeouts();

      this.pickRandomColor();

      this.isPreview = true;

      this.previewColors();

      this.pushIntoTimeoutsArray(setTimeout(() => (this.isPreview = false), (this.colorStack.length + 1) * 1000 + 750));
    },

    repeatRound() {
      this.userPickedColorStack = [];

      this.isPreview = true;

      this.previewColors();

      this.pushIntoTimeoutsArray(setTimeout(() => (this.isPreview = false), (this.colorStack.length + 1) * 1000 + 750));
    },

    // #endregion

    // #region records functions

    loadRecords() {
      this.records = JSON.parse(localStorage.getItem('records')) || [];
    },

    saveRecords() {
      const date = dayjs().format('YYYY MMM D, HH:mm:ss');
      localStorage.setItem('records', JSON.stringify([...this.records, `${this.countOfRounds} ${date}`]));
      this.loadRecords()
    },

    clearRecords() {
      this.records = [];
      localStorage.removeItem('records');
    },

    // #endregion

    pushIntoTimeoutsArray(timeout) {
      this.timeouts.push(timeout)
    },

    previewColors() {
      this.colorStack.forEach((color, index) => {
        this.pushIntoTimeoutsArray(
          setTimeout(() => {
            this.previewColor = 'none';
          }, (index + 1) * 1000 - 400)
        );

        this.pushIntoTimeoutsArray(
          setTimeout(() => {
            this.previewColor = color;
          }, (index + 1) * 1000)
        );

        this.pushIntoTimeoutsArray(setTimeout(() => this.previewColor = 'none', (this.colorStack.length + 1) * 1000))
      });
    },

    comparePickedColors() {
      const every = this.userPickedColorStack.every((color, index) => {
        return color === this.colorStack[index];
      });

      return every;
    },

    gameIsEnded() {
      const comparedPickedColors = this.comparePickedColors();

      if (!comparedPickedColors) {
        if (this.lifes === 1) {
          this.endGame();
          return;
        }

        this.removeLife();
        return;
      }

      if (this.colorStack.length === this.userPickedColorStack.length) this.startNewRound();
    },
  },
});
