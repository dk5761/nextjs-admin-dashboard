import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { billboardId: string };
  }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Store Id  is required ", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELTE] : ", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { billboardId: string; storeId: string };
  }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      redirect("/sign-in");
    }

    const { label, imageUrl } = await req.json();

    if (!label) {
      return new NextResponse("label is required ", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("ImageUrl is required ", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard Id  is required ", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", {
        status: 403,
      });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH] : ", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { billboardId: string; storeId: string };
  }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      redirect("/sign-in");
    }

    const { name } = await req.json();

    if (!name) {
      return new NextResponse("Name is required ", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Store Id  is required ", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", {
        status: 403,
      });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELTE] : ", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
