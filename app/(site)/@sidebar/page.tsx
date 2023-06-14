import getRoutes from '@/app/actions/getRoutes';
import SideBarItem from '@/app/components/SideBarItem';
import { Button } from '@/app/components/ui/button';

import { RiQuillPenFill } from 'react-icons/ri';

export default async function SideBarPage() {
  const routes = await getRoutes();
  return (
    <div className="col-span-1 px-4">
      <ul
        role="list"
        className="w-full flex flex-col py-4 gap-4 items-center xl:items-start"
      >
        {routes.map((route) => (
          <SideBarItem key={route.label} {...route} />
        ))}
      </ul>
      <Button className="bg-brand hover:bg-brand-600 rounded-full w-full">
        <span className="hidden md:inline-block">Tweet</span>
        <span className="md:hidden">
          <RiQuillPenFill size={16} />
        </span>
      </Button>
    </div>
  );
}
