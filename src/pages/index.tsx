import { Button } from "@/components/ui/button";
import { Bus, FilePen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full min-h-[70dvh] justify-center items-center gap-8">
      <h1 className="text-lg font-bold text-center">Pencatatan Kegiatan Pusdatin Kementerian Pertanian</h1>
      <div className="flex flex-col sm:flex-row gap-8 w-full h-full justify-center items-center">
        <Button onClick={() => navigate('/notulensi-rapat')} className="flex flex-col gap-4 w-fit h-fit flex-wrap" variant={'outline'}>
          <FilePen />
          Notulensi Rapat Pusdatin
        </Button>
        <Button onClick={() => navigate('/notulensi-rapat')} className="flex flex-col gap-4 w-fit h-fit flex-wrap" variant={'outline'}>
          <Bus />
          Perjalanan Dinas Pusdatin
        </Button>
      </div>
    </div>
  )
}