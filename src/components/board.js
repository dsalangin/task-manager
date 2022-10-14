import AbstractComponent from "./abstract-component";

export const createBoardTemplate = () => {
  return (
    `<section class="board container">
          <div class="board__tasks"></div>
     </section>`
  );
};

class BoardComponent extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}

export default BoardComponent;
