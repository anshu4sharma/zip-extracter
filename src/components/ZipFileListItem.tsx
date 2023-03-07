import { ZipFile } from "@/types";
import { saveAs } from "file-saver";
import React, { memo, useCallback, useMemo } from "react";
type Props = {
    file: ZipFile,
}
const ZipFileListItem = ({ file }: Props) => {
    const downloadFile = useCallback(
        async (file: ZipFile, fileName: string) => {
            try {
                if (file) {
                    const content = await file.async("blob");
                    if (content) {
                        // @ts-ignore
                        saveAs(content, fileName);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        [],
    )

    console.log("rendier");

    const fileSize = useMemo(() => `${(file._data.uncompressedSize / 1024).toFixed(2)} KB`, [file._data.uncompressedSize])
    return (
        <tr key={file.name} className="scroll-snap-align-start bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-pre-wrap dark:text-white break-words">
                {file.name}
            </th>
            {
                file.dir ? <td className="px-6 py-4 break-words">
                    {file.name} is a Dir !
                </td> : <td className="px-6 py-4">
                    {fileSize}
                </td>
            }

            <td className="px-6 py-4 cursor-pointer" onClick={() => downloadFile(file, file.name)} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
            </td>
        </tr>
    );
}

export default memo(ZipFileListItem, (prevProps, nextProps) => {
    return prevProps.file === nextProps.file;
});
