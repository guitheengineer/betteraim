import { ComponentType } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'context';

const customRender = (
  ui: React.ReactElement,
  options?: Record<string, unknown>
): RenderResult =>
  render(ui, { wrapper: Provider as ComponentType, ...options });

export * from '@testing-library/react';

export { customRender as render };
