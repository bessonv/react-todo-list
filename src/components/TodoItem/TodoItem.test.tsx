import { screen } from '@testing-library/react';
import TodoItem from './TodoItem';
import { mockData, mockDataProps } from '../../mocks/mockData';
import { customRender } from '../../mocks/customRender';
import userEvent from '@testing-library/user-event';

const dataItem = mockData[0];

describe("TodoItem component", () => {
  test('should render component correctly', () => {
    customRender(<TodoItem data={dataItem} />, mockDataProps);

    const header = screen.getByRole("heading", { level: 2 });
    expect(header).toBeInTheDocument();

    const text = dataItem.description.slice(0, 10);
    const query = new RegExp(text, 'i');
    const paragraph = screen.getByText(query);
    expect(paragraph).toBeInTheDocument();

    const date = [
      dataItem.created.getDate(),
      dataItem.created.getMonth() + 1,
      dataItem.created.getFullYear()
    ].join('.');
    const span = screen.getByText(date);
    expect(span).toBeInTheDocument();
  });

  test('should show item information when click on the element', async () => {
    const showTodo = jest.fn();
    const mockProps = {
      ...mockDataProps,
      functions: {
        showTodo
      }
    };
    customRender(<TodoItem data={dataItem} />, mockProps);

    const liItem = screen.getByRole('listitem');
    await userEvent.click(liItem);
    expect(showTodo).toHaveBeenCalled();
  });

  test('should show confirm dialog when delete button clicked', async () => {
    const showDeleteTodo = jest.fn();
    const mockProps = {
      ...mockDataProps,
      functions: {
        showDeleteTodo
      }
    };
    customRender(<TodoItem data={dataItem} />, mockProps);

    const deleteButton = screen.getByText('X');
    await userEvent.click(deleteButton);
    expect(showDeleteTodo).toHaveBeenCalled();
  });
});
