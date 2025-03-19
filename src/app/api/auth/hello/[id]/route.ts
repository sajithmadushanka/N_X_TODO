
export async function GET(req: Request, { params }: { params: { id: string } }){ 
    const {id} = params
    console.log('this is dynamic route')
    return new Response(`Hello ${id}`);
}