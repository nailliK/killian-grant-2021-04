<template>
  <main id="life-simulator"
        class="life-simulator">
    <div :style="{
      'grid-template-columns': `repeat(${cols}, 1fr)`,
      'grid-template-rows': `repeat(${rows}, 1fr)`,
    }"
         class="canvas">
      <div v-for="(cell, index) in cells"
           :key="index"
           :class="{
             'cell--alive':cell.alive,
           }"
           class="cell"></div>
    </div>

    <div class="header-controls">
      <button class="button"
              v-on:click="onRestart">Restart
      </button>
    </div>
  </main>
</template>

<style lang="scss">

</style>

<script lang="ts">
import Cell from "@/ts/lib/interfaces/Cell";
import LooseObject from "@/ts/lib/interfaces/LooseObject";
import {onMounted, Ref, ref, SetupContext} from "vue";

export default {
  name: "LifeSimulator",
  components: {},
  props: [
    "start"
  ],
  setup: function (props: LooseObject, context: SetupContext): LooseObject {
    const fps: number = 24;

    const rows: Ref<number> = ref(32);
    const cols: Ref<number> = ref(32);

    let matrix: Array<Cell> = [];
    let snapshot: Array<boolean> = [];

    const cells: Ref<Array<Cell>> = ref([]);


    const getMatrixAt: Function = (x: number, y: number): Cell => {
      return <Cell>matrix.find((m: Cell) => {
        return m.x === x && m.y === y;
      });
    };

    const makeCell: Function = (x: number, y: number): Cell => {
      return <Cell>{
        alive: Math.round(Math.random()) > 0.5,
        x: x,
        y: y,
        density: 0,
        neighbors: {}
      };
    };

    const setNeighbor: VoidFunction = (x: number, y: number): void => {
      let _x: number = x - 1;
      if (_x < 0) {
        _x = cols.value - 1;
      }

      let _y: number = y - 1;
      if (_y < 0) {
        _y = rows.value - 1;
      }

      let x_: number = x + 1;
      if (x_ > cols.value - 1) {
        x_ = 0;
      }

      let y_: number = y + 1;
      if (y_ > rows.value - 1) {
        y_ = 0;
      }

      let c: Cell = getMatrixAt(x, y);
      c.neighbors = {
        tl: getMatrixAt(_x, _y),
        t: getMatrixAt(x, _y),
        tr: getMatrixAt(x_, _y),
        r: getMatrixAt(x_, y),
        br: getMatrixAt(x_, y_),
        b: getMatrixAt(x, y_),
        bl: getMatrixAt(_x, y_),
        l: getMatrixAt(_x, y)
      };
    };

    const setNeighbors: VoidFunction = (): void => {
      for (let y: number = 0; y < rows.value; y++) {
        for (let x: number = 0; x < cols.value; x++) {
          setNeighbor(x, y);
        }
      }
    };

    const setSnapshot: VoidFunction = (): void => {
      // For determining sameness later
      // const original: Array<Cell> = snapshot.slice(0);

      snapshot = [];

      for (let y: number = 0; y < rows.value; y++) {
        for (let x: number = 0; x < cols.value; x++) {
          let m: Cell = getMatrixAt(x, y);
          let i: number = matrix.indexOf(m);

          let a: number = 0;
          let s: boolean = false;

          for (let n in m.neighbors) {
            a += m.neighbors[n].alive ? 1 : 0;
          }

          // if current node is alive
          if (m.alive === true) {
            // if alive neighbors are 2 or 3, keep alive
            if (a >= 2 && a <= 3) {
              s = true;
              // if alive neighbors are less than 2 or more than 3, make not alive
            } else {
              s = false;
            }
          } else if (m.alive === false) {
            // if current node is dead
            if (a === 3) {
              // if neighbors are 3 bring back to life
              s = true;
            }
          }
          snapshot[i] = s;
          m.density = a;
        }
      }
    };

    const setMatrix: VoidFunction = (): void => {
      for (let s: number = 0; s < snapshot.length; s++) {
        matrix[s].alive = snapshot[s];
      }
    };

    const setCells: VoidFunction = (): void => {
      cells.value = [];
      for (let m: number = 0; m < matrix.length; m++) {
        cells.value[m] = matrix[m];
      }
    };

    const tick: VoidFunction = (): void => {
      setSnapshot();
      setMatrix();
      setCells();

      setTimeout(tick, 1000 / fps);
    };

    const reset: VoidFunction = (): void => {
      matrix = [];
      snapshot = [];

      for (let y: number = 0; y < rows.value; y++) {
        for (let x: number = 0; x < cols.value; x++) {
          const n: Cell = makeCell(x, y);
          snapshot.push(n.alive);
          matrix.push(n);
        }
      }

      setNeighbors();
    };

    const resize: VoidFunction = (): void => {
      const squareSize: number = parseInt(window.getComputedStyle(document.body, null)
          .getPropertyValue("line-height"));
      cols.value = Math.ceil(window.innerWidth / squareSize);
      rows.value = Math.ceil(window.innerHeight / squareSize);

      reset();
    };

    const init: VoidFunction = (): void => {
      window.addEventListener("resize", resize);
      resize();
      tick();
    };

    const onRestart: VoidFunction = (): void => {
      reset();
    };

    onMounted(() => {
      init();
    });

    return {
      rows,
      cols,
      cells,
      onRestart
    };
  }
};
</script>
