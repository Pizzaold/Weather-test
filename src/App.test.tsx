import { expect, test } from 'vitest';
import { render, screen, waitFor, within, act } from '@testing-library/react';
import App from "./App";
import createMockServer from './createMockServer';
import { Server } from 'miragejs';
import userEvent from '@testing-library/user-event';
import WeatherCard from './components/WeatherCard';

let server: Server;
beforeEach(() => {
  server = createMockServer();
});

afterEach(() => {
  server.shutdown();
});

describe("Weather App test", () => {
  let server: Server;
  beforeEach(() => {
    server = createMockServer();
  });

  afterEach(() => {
    server.shutdown();
  });

  it("renders the app title", () => {
    render(<App />);
    const title = screen.getByText("Weather App");
    expect(title).toBeInTheDocument();
  });

  it("show city search result", async () => {
    render(<App />);

    const input = screen.getByTestId("search-input");
    userEvent.type(input, "Tartu");

    const button = screen.getByTestId("search-button");
    await act(async () => {
      userEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2);
      expect(screen.getByText(/Tartu, 58.3801207, 26.72245/i)).toBeInTheDocument();
    });
  });

  it("add search result to the list", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByTestId("search-input");
    await user.type(input, "Tartu");
    
    const button = screen.getByTestId("search-button");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2);
    });

    const selected = screen.getAllByRole('heading', { level: 2 })[0];
    await user.click(selected);

    await waitFor(() => {
      expect(
        within(screen.getByTestId("my-weather-list"))
          .getByRole('heading', { level: 2, name: /Tartu/i })
      ).toBeInTheDocument();
    });
    expect(screen.queryByTestId("search-results")).not.toBeInTheDocument();
  });
});

describe("Weather Card", () => {
  it("renders city name", () => {
    const city = { name: "Tartu", lat: 58.3801207, lon: 26.72245, country: "Estonia" };
    render(<WeatherCard city={city} />);
    expect(screen.getByText(city.name)).toBeInTheDocument();
  });

  it("renders temperature", async () => {
    const city = { name: "Tartu", lat: 58.3801207, lon: 26.72245, country: "Estonia" };
    render(<WeatherCard city={city} />);
    await waitFor(() => {
      expect(screen.getByText("-7°C")).toBeInTheDocument();
    });
  });

  it("render placeholder when temperature is not available", () => {
    const city = { name: "Tartu", lat: 58.3801207, lon: 26.72245, country: "Estonia" };
    render(<WeatherCard city={city} />);
    expect(screen.getByText("-273°C")).toBeInTheDocument();
  });

  it("render weather information", async () => {
    const city = { name: "Tartu", lat: 58.3801207, lon: 26.72245, country: "Estonia" };
    render(<WeatherCard city={city} />);
    await waitFor(() => {
      expect(screen.getByText("Clouds")).toBeInTheDocument();
    });
  });
});