import Phaser from "phaser";

interface GameState {
	fpsText: Phaser.GameObjects.Text | null;
}

const state: GameState = {
	fpsText: null,
};

export function getState(): GameState {
	return state;
}

export function setState<K extends keyof GameState>(
	key: K,
	value: GameState[K]
) {
	state[key] = value;
}

export function createFpsText(scene: Phaser.Scene) {
	const text = scene.add
		.text(10, 10, "", {
			fontSize: "16px",
			color: "#00ff00",
			fontFamily: "Segoe UI",
		})
		.setDepth(999);
	state.fpsText = text;
}

export function updateFpsText(scene: Phaser.Scene) {
	state.fpsText?.setText(`FPS: ${Math.floor(scene.game.loop.actualFps)}`);
}
