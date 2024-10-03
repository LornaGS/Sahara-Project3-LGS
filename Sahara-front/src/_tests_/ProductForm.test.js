import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductForm from '../admincomponents/ProductForm';

describe('ProductForm Component', () => {
  let formData;
  let handleChange;
  let handleSubmit;
  let handleCancel;

  beforeEach(() => {
    formData = {
      name: '',
      price: '',
      quantity: '',
      imageUrl: '',
      color: '',
      category: '',
      tags: [],
    };
    handleChange = jest.fn();
    handleSubmit = jest.fn((e) => e.preventDefault());
    handleCancel = jest.fn();
  });

  // test('renders the form with all fields', () => {
  //   const { getByLabelText } = render(
  //     <ProductForm
  //       formData={formData}
  //       onChange={handleChange}
  //       onSubmit={handleSubmit}
  //       onCancel={handleCancel}
  //     />
  //   );

  //   expect(getByLabelText(/Name:/i)).toBeInTheDocument();
  //   expect(getByLabelText(/Price:/i)).toBeInTheDocument();
  //   expect(getByLabelText(/Quantity:/i)).toBeInTheDocument();
  //   expect(getByLabelText(/Image URL:/i)).toBeInTheDocument();
  //   expect(getByLabelText(/Color:/i)).toBeInTheDocument();
  //   expect(getByLabelText(/Category:/i)).toBeInTheDocument();
  //   expect(getByLabelText(/Tags:/i)).toBeInTheDocument();
  // });

  // test('allows the user to fill in the form', () => {
  //   const { getByLabelText } = render(
  //     <ProductForm
  //       formData={formData}
  //       onChange={handleChange}
  //       onSubmit={handleSubmit}
  //       onCancel={handleCancel}
  //     />
  //   );

  //   fireEvent.change(getByLabelText(/Name:/i), { target: { value: 'New Product' } });
  //   fireEvent.change(getByLabelText(/Price:/i), { target: { value: '50.00' } });
  //   fireEvent.change(getByLabelText(/Quantity:/i), { target: { value: '10' } });
  //   fireEvent.change(getByLabelText(/Image URL:/i), { target: { value: 'https://example.com/image.jpg' } });
  //   fireEvent.change(getByLabelText(/Color:/i), { target: { value: 'red' } });
  //   fireEvent.change(getByLabelText(/Category:/i), { target: { value: 'Pens' } });
  //   fireEvent.change(getByLabelText(/Tags:/i), { target: { value: 'Pens' } });

  //   expect(handleChange).toHaveBeenCalledWith({
  //     ...formData,
  //     name: 'New Product',
  //     price: '50.00',
  //     quantity: '10',
  //     imageUrl: 'https://example.com/image.jpg',
  //     color: 'red',
  //     category: 'Pens',
  //     tags: 'Pens'
  //   });
  // });

  // test('validates price input to allow only valid currency values', () => {
  //   const { getByLabelText } = render(
  //     <ProductForm
  //       formData={formData}
  //       onChange={handleChange}
  //       onSubmit={handleSubmit}
  //       onCancel={handleCancel}
  //     />
  //   );

  //   const priceInput = getByLabelText(/Price:/i);

  //   fireEvent.change(priceInput, { target: { value: '50.123' } });
  //   expect(priceInput.value).toBe('50.12'); // Only 2 decimal places allowed

  //   fireEvent.change(priceInput, { target: { value: 'abc' } });
  //   expect(priceInput.value).toBe(''); // Invalid input cleared
  // });

  test('submits the form when valid data is entered', () => {
    // Arrange
    const { getByText } = render(
      <ProductForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );

    // Act
    fireEvent.click(getByText(/submit/i));

    // Assert
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('cancels the form when cancel button is clicked', () => {
    // Arrange
    const { getByText } = render(
      <ProductForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );

    // Act
    fireEvent.click(getByText(/cancel/i));

    // Assert
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});