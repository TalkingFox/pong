export class GameOver {
    private windowElement: HTMLElement;
    private messageElement: HTMLParagraphElement;
    private playAgainElement: HTMLButtonElement;

    public constructor() {
        this.windowElement = document.getElementById('gameOver');
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

    public dispose(): void {
        this.visible = false;
    }

    public set message(message: string) {
        this.messageElement.textContent = message;
    }

    public set visible(isVisible: boolean) {
        if (this.windowElement.classList.contains('hidden')
            && !isVisible) {
            return;
        }

        if (isVisible) {
            this.windowElement.classList.remove('hidden');
        } else {
            this.windowElement.classList.add('hidden');
        }
    }
}