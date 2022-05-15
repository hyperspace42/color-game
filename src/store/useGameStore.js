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
      previewColor: 'none',
      colorStack: [],
      userPickedColorStack: [],
      records: [],
      countOfRounds: 0,
      lifes: 3,
      isPreview: false,
      isGameRunning: false,
    };
  },

  getters: {
    getColors(state) {
      return state.colorsClasses.map((color) => color.split('-')[0]);
    },
  },

  actions: {
    //#region color pick actions

    pickRandomColor() {
      const colors = this.getColors;
      let color = Math.floor(Math.random() * colors.length);

      this.colorStack.push(colors[color]);
    },

    pickColor(color) {
      this.userPickedColorStack.push(color);
    },

    //#endregion

    //#region game parameters control actions

    clearValues() {
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
      this.loadRecords();
    },

    removeLife() {
      this.lifes -= 1;
      this.repeatRound();
    },

    //#endregion

    // #region rounds control actions

    repeatRound() {
      this.userPickedColorStack = [];

      this.isPreview = true;

      this.previewColors();

      setTimeout(() => (this.isPreview = false), this.colorStack.length * 1000 + 750);
    },

    startNewRound() {
      this.countOfRounds += 1;
      this.userPickedColorStack = [];

      this.pickRandomColor();

      this.isPreview = true;

      this.previewColors();

      setTimeout(() => (this.isPreview = false), this.colorStack.length * 1000 + 750);
    },

    // #endregion

    // #region records functions

    loadRecords() {
      this.records = JSON.parse(localStorage.getItem('records')) || [];
    },

    saveRecords() {
      const date = dayjs().format('YYYY MMM D, HH:mm:ss');
      localStorage.setItem('records', JSON.stringify([...this.records, `${this.countOfRounds} ${date}`]));
    },

    // #endregion

    previewColors() {
      this.colorStack.forEach((color, index) => {
        setTimeout(() => {
          this.previewColor = 'none';
        }, (index + 1) * 1000 - 400);

        setTimeout(() => {
          this.previewColor = color;
        }, (index + 1) * 1000);
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
