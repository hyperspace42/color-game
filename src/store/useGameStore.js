import { defineStore } from 'pinia';

export const useGameStore = defineStore('gameStore', {
  state: () => {
    return {
      squareColors: [
        'white-square',
        'red-square',
        'amber-square',
        'purple-square',
        'green-square',
        'indigo-square',
        'pink-square',
        'blue-square',
        'black-square',
      ],
      colorStack: [],
      userPickedColorStack: [],
      countOfRounds: 0,
      showingColor: 'none',
      isPreview: false,
    };
  },

  getters: {
    getColors(state) {
      return state.squareColors.map((color) => color.split('-')[0]);
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

    startNewRound() {
      this.countOfRounds += 1;
      this.userPickedColorStack = [];

      this.pickRandomColor();

      this.isPreview = true;

      this.previewColors()

      setTimeout(() => (this.isPreview = false), this.colorStack.length * 1300 + 750);
    },

    endGame() {
      this.colorStack = [];
      this.userPickedColorStack = [];
      this.countOfRounds = 0;
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
        return color == this.colorStack[index];
      });

      if (every) {
        if (this.colorStack.length === this.userPickedColorStack.length) {
          this.startNewRound();
        }

        return;
      }

      console.log('Game ended');
      this.endGame();
      this.startNewRound();
    },
  },
});
