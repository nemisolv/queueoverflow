import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useTheme } from "@/context/ThemeProvider"
import { themes } from "@/constants";
import { ThemeType } from "@/types/static-type";



function Theme() {

  const { mode, setMode } = useTheme();
  return <Menubar className="relative border-none bg-transparent select-none ">
    <MenubarMenu >
      <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200" >

        <img src={`/assets/icons/${mode === 'light' ? 'sun.svg' : 'moon.svg'}`} alt="" className="active-theme" />


      </MenubarTrigger>
      <MenubarContent className=" absolute right-[-3rem] mt-3 min-w-[120px]  rounded border dark:bg-dark-300 dark:border-dark-400  text-dark200_light800  "

      >

        {
          themes.map((theme: ThemeType) => (
            <MenubarItem key={theme.name} className="px-3 py-1 dark:hover:bg-dark-400 cursor-pointer flex gap-3 items-center"
              onClick={
                () => {
                  setMode(theme.name);
                  if (theme.name !== 'system') {
                    localStorage.setItem('theme', theme.name);
                  } else {
                    localStorage.removeItem('theme');
                  }
                }
              }>
              <img src={theme.icon} alt="" className={` w-[16px] h-[16px] object-cover  ${mode === theme.name ? 'active-theme' : ''} `} />
              <p className={`body-semibold ${mode === theme.name ? 'text-primary-500' : ''}`}>   {theme.label}</p></MenubarItem>
          ))
        }

      </MenubarContent>
    </MenubarMenu>
  </Menubar>

}

export default Theme;