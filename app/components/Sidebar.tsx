import Button from './ui/Button';
import SideBarItem from './SideBarItem';
import getRoutes from '../actions/getRoutes';

const Sidebar = async () => {
  const routes = await getRoutes();

  return (
    <ul
      role="list"
      className="w-full flex flex-col py-4 gap-4 items-center xl:items-start"
    >
      {routes.map((route) => (
        <SideBarItem key={route.label} {...route} />
      ))}
    </ul>
  );
};

export default Sidebar;
