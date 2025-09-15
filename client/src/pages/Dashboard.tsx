import React, { useState, createElement } from 'react';
import styled from 'styled-components';
import { FaHome, FaBook, FaTasks, FaCalendar, FaComments, FaCog, FaBars, FaTimes, FaUser, FaGraduationCap } from 'react-icons/fa';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
  font-family: 'Arial', sans-serif;
`;

const Sidebar = styled.div<{ $isOpen: boolean }>`
  width: 280px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transition: transform 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 1000;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Navigation = styled.nav`
  padding: 20px 0;
`;

const NavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border-right: ${props => props.$active ? '3px solid #fff' : '3px solid transparent'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    font-size: 1.2rem;
  }
  
  span {
    font-size: 1rem;
    font-weight: 500;
  }
`;

const MainContent = styled.div<{ $sidebarOpen: boolean }>`
  flex: 1;
  margin-left: 280px;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

const Header = styled.header`
  background: white;
  padding: 15px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const Content = styled.div`
  padding: 20px;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const WelcomeTitle = styled.h1`
  margin: 0 0 10px 0;
  font-size: 2rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const WelcomeSubtitle = styled.p`
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StatTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
`;

const ProgressBar = styled.div`
  background: #e9ecef;
  border-radius: 10px;
  height: 10px;
  margin: 15px 0;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percentage: number; $color: string }>`
  background: ${props => props.$color};
  height: 100%;
  width: ${props => props.$percentage}%;
  border-radius: 10px;
  transition: width 0.3s ease;
`;

const ProgressPercentage = styled.div<{ $color: string }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.$color};
  margin-bottom: 10px;
`;

const CoursesSection = styled.div`
  margin-top: 30px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const CourseCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CourseHeader = styled.div<{ $color: string }>`
  background: ${props => props.$color};
  color: white;
  padding: 20px;
  text-align: center;
`;

const CourseTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const CourseBody = styled.div`
  padding: 20px;
`;

const CourseProgress = styled.div`
  margin-top: 15px;
`;

const Overlay = styled.div<{ $show: boolean }>`
  display: ${props => props.$show ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  const navigationItems = [
    { id: 'home', label: 'Home', icon: FaHome },
    { id: 'courses', label: 'My Courses', icon: FaBook },
    { id: 'assignments', label: 'Assignments', icon: FaTasks },
    { id: 'timetable', label: 'Time Table', icon: FaCalendar },
    { id: 'forum', label: 'Forum', icon: FaComments },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  const progressData = [
    { title: 'Module Progress', percentage: 75, color: '#667eea' },
    { title: 'Assignment Progress', percentage: 60, color: '#f093fb' },
    { title: 'Attendance Progress', percentage: 90, color: '#4facfe' },
    { title: 'Course Progress', percentage: 68, color: '#43e97b' },
  ];

  const courses = [
    { title: 'Diploma in English', progress: 85, color: '#667eea' },
    { title: 'Diploma in IT', progress: 72, color: '#f093fb' },
    { title: 'HND in Computing', progress: 55, color: '#4facfe' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <DashboardContainer>
      <Overlay $show={sidebarOpen} onClick={closeSidebar} />
      
      <Sidebar $isOpen={sidebarOpen}>
        <SidebarHeader>
          <Logo>
            {createElement(FaGraduationCap as any)}
            MobDesk
          </Logo>
        </SidebarHeader>
        
        <Navigation>
          {navigationItems.map((item) => (
            <NavItem
              key={item.id}
              $active={activeNav === item.id}
              onClick={() => {
                setActiveNav(item.id);
                closeSidebar();
              }}
            >
              {createElement(item.icon as any)}
              <span>{item.label}</span>
            </NavItem>
          ))}
        </Navigation>
      </Sidebar>

      <MainContent $sidebarOpen={sidebarOpen}>
        <Header>
          <MobileMenuButton onClick={toggleSidebar}>
            {sidebarOpen ? createElement(FaTimes as any) : createElement(FaBars as any)}
          </MobileMenuButton>
          
          <UserInfo>
            <div>
              <div style={{ fontWeight: 'bold', color: '#333' }}>John Doe</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Student</div>
            </div>
            <UserAvatar>
              {createElement(FaUser as any)}
            </UserAvatar>
          </UserInfo>
        </Header>

        <Content>
          <WelcomeSection>
            <WelcomeTitle>Welcome back, John!</WelcomeTitle>
            <WelcomeSubtitle>Continue your learning journey and track your progress.</WelcomeSubtitle>
          </WelcomeSection>

          <StatsGrid>
            {progressData.map((stat, index) => (
              <StatCard key={index}>
                <StatTitle>{stat.title}</StatTitle>
                <ProgressPercentage $color={stat.color}>
                  {stat.percentage}%
                </ProgressPercentage>
                <ProgressBar>
                  <ProgressFill $percentage={stat.percentage} $color={stat.color} />
                </ProgressBar>
              </StatCard>
            ))}
          </StatsGrid>

          <CoursesSection>
            <SectionTitle>Your Courses</SectionTitle>
            <CoursesGrid>
              {courses.map((course, index) => (
                <CourseCard key={index}>
                  <CourseHeader $color={course.color}>
                    <CourseTitle>{course.title}</CourseTitle>
                  </CourseHeader>
                  <CourseBody>
                    <CourseProgress>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Progress</span>
                        <span style={{ fontWeight: 'bold', color: course.color }}>
                          {course.progress}%
                        </span>
                      </div>
                      <ProgressBar>
                        <ProgressFill $percentage={course.progress} $color={course.color} />
                      </ProgressBar>
                    </CourseProgress>
                  </CourseBody>
                </CourseCard>
              ))}
            </CoursesGrid>
          </CoursesSection>
        </Content>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;