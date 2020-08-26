import { Scene, Sprite, getPointer, onPointerDown } from "kontra";

export function makeDesignScene() {
  return Promise.all([]).then(
    ([]) => {
      let sprite = Sprite({
        x: 300,
        y: 100,
        anchor: {x: 0.5, y: 0.5},

        // required for a rectangle sprite
        width: 20,
        height: 40,
        color: 'red'
      })

      onPointerDown(function(e, object) {
        const { x, y } = getPointer()
        console.log('click', { x, y })
      })

      return Scene({
        id: "game",
        children: [sprite],
        update: () => {
          const pointer = getPointer()
          sprite.x = pointer.x 
          sprite.y = pointer.y 
        },
      });
    }
  );
}
