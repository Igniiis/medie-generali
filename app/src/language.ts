export function languageGeneration(): void {
    const userLang: string = navigator.language || navigator.language;
    const elements: NodeListOf<HTMLElement> = document.querySelectorAll('[lang]');
    elements.forEach((element: HTMLElement) => {
      element.style.display = 'none';
    });
  
    if (userLang === 'fr-FR') {
      const frElements: NodeListOf<HTMLElement> = document.querySelectorAll('[lang=fr]');
      frElements.forEach((element: HTMLElement) => {
        element.style.display = 'block';
      });
    } else if (userLang === 'en-EN') {
      const enElements: NodeListOf<HTMLElement> = document.querySelectorAll('[lang=en]');
      enElements.forEach((element: HTMLElement) => {
        element.style.display = 'block';
      });
    } else {
      const enElements: NodeListOf<HTMLElement> = document.querySelectorAll('[lang=en]');
      enElements.forEach((element: HTMLElement) => {
        element.style.display = 'block';
      });
    }
  }
  