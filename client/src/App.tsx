import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AppRoutes, shouldShowLayout } from './routes';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
`;

const MainContent = styled.main<{ hasHeader: boolean }>`
  flex: 1;
  margin-top: ${props => props.hasHeader ? '80px' : '0'};
`;

// Component wrapper để kiểm tra layout
const AppLayout: React.FC = () => {
  const location = useLocation();
  const needsLayout = shouldShowLayout(location.pathname);

  return (
    <AppContainer>
      {needsLayout && <Header />}
      <MainContent hasHeader={needsLayout}>
        <AppRoutes />
      </MainContent>
      {needsLayout && <Footer />}
    </AppContainer>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
