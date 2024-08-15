interface TitleProps {
    variant?: 'primary' | 'secondary' ,
    children: string
}

const Title = ({ variant, children }: TitleProps) => {
    return (
        <>
            {
                <h1 className="text-2xl font-medium  ">
                    {children}
                </h1>
            }

        </>
    );
}

export default Title;