import { OverlayElement } from "../../ui/overlay-element";

export class GameOver extends OverlayElement{
    private messageElement: HTMLParagraphElement;
    private playAgainElement: HTMLButtonElement;

    public constructor() {
        super('gameOver');
        this.messageElement = document.getElementById('gameOverMessage') as HTMLParagraphElement;
        this.playAgainElement = document.getElementById('gameOverPlayAgain') as HTMLButtonElement;
    }

    public display(winner: string): Promise<void> {
        this.visible = true;
        this.message = winner + ' won! Would you like to play again?';
        const promise = new Promise<void>((resolve, reject) => {
            const listener = () => {
                this.playAgainElement.removeEventListener('click', listener);
                resolve();
            }
            this.playAgainElement.addEventListener('click', listener);
        });
        return promise;
    }

    public set message(message: string) {
        this.messageElement.textContent = message;
    }
}