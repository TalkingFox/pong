export abstract class OverlayElement {
    private parentElement: HTMLElement;
    
    constructor(parentElementId: string) {
        this.parentElement = document.getElementById(parentElementId);
    }

    public dispose(): void {
        this.visible = false;
    }

    public set visible(isVisible: boolean) {
        if (this.parentElement.classList.contains('hidden')
            && !isVisible) {
            return;
        }

        if (isVisible) {
            this.parentElement.classList.remove('hidden');
        } else {
            this.parentElement.classList.add('hidden');
        }
    }
}