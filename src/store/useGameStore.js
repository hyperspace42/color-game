import { defineStore } from 'pinia';

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
      colorStack: [],
      userPickedColorStack: [],
      countOfRounds: 0,
      showingColor: 'none',
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
    pickRandomColor() {
      const colors = this.getColors;
      let color = Math.floor(Math.random() * colors.length);

      this.colorStack.push(colors[color]);
    },

    pickColor(color) {
      this.userPickedColorStack.push(color);
    },

    clearValues() {
      this.colorStack = [];
      this.userPickedColorStack = [];
      this.countOfRounds = 0;
      this.showingColor = 'none';
      this.isPreview = false;
    },

    startGame() {
      this.clearValues();
      this.isGameRunning = true;
      this.startNewRound();
    },

    endGame() {
      this.clearValues();
      this.isGameRunning = false;
    },

    startNewRound() {
      this.countOfRounds += 1;
      this.userPickedColorStack = [];

      this.pickRandomColor();

      this.isPreview = true;

      this.previewColors();

      setTimeout(() => (this.isPreview = false), this.colorStack.length * 1300 + 750);
    },

    previewColors() {
      this.colorStack.forEach((color, index) => {
        setTimeout(() => {
          this.showingColor = 'none';
        }, (index + 1) * 1300 - 400);

        setTimeout(() => {
          this.showingColor = color;
        }, (index + 1) * 1300);
      });
    },

    comparePickedColors() {
      const every = this.userPickedColorStack.every((color, index) => {
        return color === this.colorStack[index];
      });

      if (!every) {
        console.log('Game ended');
        this.endGame();
        return;
      }

      if (this.colorStack.length === this.userPickedColorStack.length) {
        this.startNewRound();
      }
    },
  },
});
