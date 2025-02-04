/* eslint-disable @typescript-eslint/no-explicit-any */
import Aos from "aos";
import { collection, getDocs } from "firebase/firestore";
import { Award, Boxes, Code } from "lucide-react";
import SwipeableViews from "react-swipeable-views";
import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import React, {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Direction, Theme, useTheme } from "@mui/material/styles";

import "aos/dist/aos.css";
import { db } from "../configs/firebase";
import CardProject from "./CardProject";
import CardCertificate from "./CardCertificate";
import ToggleButton from "./ToggleButton";
import { techStacks } from "../constants/common";
import TechStackIcon from "./TechStackIcon";

type NavType = {
  value: number;
  handleChange: (event: any, newValue: any) => void;
};

type ContentPanelType = {
  value: any;
  setValue: any;
  theme: Theme;
  displayedProjects: any;
  projects: any;
  initialItems: any;
  showAllProjects: boolean;
  toggleShowMore: any;
  displayedCertificates: any;
  showAllCertificates: any;
  certificates: any;
};

type TabPanelType = {
  children: ReactNode;
  value: number;
  index: number;
  dir: Direction;
};

const Portfolio = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [projects, setProjects] = useState<any>([]);
  const [certificates, setCertificates] = useState<any>([]);

  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, initialItems);

  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);

  useEffect(() => {
    // Initialize AOS once
    Aos.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");
      const [projectSnapshot, certificateSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
      ]);
      
      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => doc.data());

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleShowMore = useCallback((type: string) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const handleChange = (_: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] lg:px-[10%] mt-10 sm:mt-0"
      id="Portofolio"
    >
      <Header />

      <Nav value={value} handleChange={handleChange} />

      <ContentPanel
        value={value}
        setValue={setValue}
        theme={theme}
        displayedProjects={displayedProjects}
        initialItems={initialItems}
        projects={projects}
        showAllProjects={showAllProjects}
        toggleShowMore={toggleShowMore}
        displayedCertificates={displayedCertificates}
        certificates={certificates}
        showAllCertificates={showAllCertificates}
      />
    </div>
  );
};

export default Portfolio;

const Header = memo(() => {
  return (
    <div
      className="text-center pb-10"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
        <span
          style={{
            color: "#6366f1",
            backgroundImage: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Portfolio Showcase
        </span>
      </h2>
      <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
        Explore my journey through projects, certifications, and technical
        expertise. Each section represents a milestone in my continuous learning
        path.
      </p>
    </div>
  );
});

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Nav: React.FC<NavType> = memo(({ value, handleChange }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
            backdropFilter: "blur(10px)",
            zIndex: 0,
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
          sx={{
            minHeight: "70px",
            "& .MuiTab-root": {
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: "600",
              color: "#94a3b8",
              textTransform: "none",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              padding: "20px 0",
              zIndex: 1,
              margin: "8px",
              borderRadius: "12px",
              "&:hover": {
                color: "#ffffff",
                backgroundColor: "rgba(139, 92, 246, 0.1)",
                transform: "translateY(-2px)",
                "& .lucide": {
                  transform: "scale(1.1) rotate(5deg)",
                },
              },
              "&.Mui-selected": {
                color: "#fff",
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                "& .lucide": {
                  color: "#a78bfa",
                },
              },
            },
            "& .MuiTabs-indicator": {
              height: 0,
            },
            "& .MuiTabs-flexContainer": {
              gap: "8px",
            },
          }}
        >
          <Tab
            icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
            label="Projects"
            {...a11yProps(0)}
          />
          <Tab
            icon={
              <Award className="mb-2 w-5 h-5 transition-all duration-300" />
            }
            label="Certificates"
            {...a11yProps(1)}
          />
          <Tab
            icon={
              <Boxes className="mb-2 w-5 h-5 transition-all duration-300" />
            }
            label="Tech Stack"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
    </Box>
  );
});

const ContentPanel: React.FC<ContentPanelType> = memo(
  ({
    value,
    setValue,
    theme,
    displayedProjects,
    projects,
    initialItems,
    showAllProjects,
    toggleShowMore,
    displayedCertificates,
    showAllCertificates,
    certificates,
  }) => {
    return (
      <SwipeableViews
        index={value}
        onChangeIndex={setValue}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {displayedProjects.map((project: any, index: any) => (
                <div
                  key={project.id || index}
                  data-aos={
                    index % 3 === 0
                      ? "fade-up-right"
                      : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                  }
                  data-aos-duration={
                    index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                  }
                >
                  <CardProject
                    img={project.Img}
                    title={project.Title}
                    description={project.Description}
                    link={project.Link}
                    id={project.id}
                  />
                </div>
              ))}
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore("projects")}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </div>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
              {displayedCertificates.map((certificate: any, index: any) => (
                <div
                  key={index}
                  data-aos={
                    index % 3 === 0
                      ? "fade-up-right"
                      : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                  }
                  data-aos-duration={
                    index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                  }
                >
                  <CardCertificate imgSertif={certificate.Img} />
                </div>
              ))}
            </div>
          </div>
          {certificates.length > initialItems && (
            <div className="mt-6 w-full flex justify-start">
              <ToggleButton
                onClick={() => toggleShowMore("certificates")}
                isShowingMore={showAllCertificates}
              />
            </div>
          )}
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  data-aos={
                    index % 3 === 0
                      ? "fade-up-right"
                      : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                  }
                  data-aos-duration={
                    index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                  }
                >
                  <TechStackIcon
                    techStackIcon={stack.icon}
                    language={stack.language}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
      </SwipeableViews>
    );
  }
);

const TabPanel: React.FC<TabPanelType> = memo(
  ({ children, value, index, ...other }) => {
    return (
      <div
        id={`full-width-tabpanel-${index}`}
        role="tabpanel" // Xác định vai trò của phần tử này là một panel tab để hỗ trợ accessibility */}
        hidden={value !== index} //Ẩn panel này khi nó không phải là tab đang được chọn */}
        aria-labelledby={`full-width-tab-${index}`} //Liên kết panel này với nút tab tương ứng để người dùng screen reader có thể hiểu */}
        {...other}
      >
        {value === index && (
          <Box
            sx={{
              p: {
                xs: 1,
                sm: 3,
              },
            }}
          >
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
);
