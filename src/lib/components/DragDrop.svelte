<script lang="ts">
   import { invalidateAll } from '$app/navigation';
   import { cn } from '$lib/utils.js'; 
   import {page} from '$app/stores';
   import { db, storage } from '$lib/firebaseConfig';
   import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import toast from 'svelte-french-toast';
   let isDragging = false;
   let files: File[]=[];
   let fileInput: HTMLInputElement;
   // max file size 10MB
   const maxSize = 10 * 1024 * 1024;
   // uid 
   const uid=$page.data.user.uid;

   // handles drag enter event ,when files enters the drag&drop area
   function handleDragEnter(){
      isDragging=true;
   };
   // handles drag leave envet,when files leave drag$drop area
   function handleDragLeave(){
      isDragging=false;
   };
   // handles drop event,when files are dropped in drag&drop area
   function handleDrop(event: DragEvent){
      isDragging=false;
      if(event.dataTransfer?.files){
         const droppedFiles=Array.from(event.dataTransfer?.files);
         handleFileSize(droppedFiles);
      }
   };
   // handles click event,when user clicks in drag&drop area
   function handleClick(event: MouseEvent){
      fileInput.click();
   };
   // handles  secelcted files
   const handleFileSelect = () => {
		if (fileInput.files) {
			const selectedFiles = Array.from(fileInput.files);
			handleFileSize(selectedFiles);
		}
	};
   // calculate file size and prevent upload if files size reaches maxFileSize
   const handleFileSize =async(files: File[])=>{
      const allFilesValidCheck=files.every((file)=>{
         if(file.size>maxSize){
            alert(`Error: ${file.name} file exceeds max size limit of 10MB.`)
            return false;
         }
         return true;
      });
      if (allFilesValidCheck && files.length!==0) {
			await toast.promise(Promise.all(files.map(HandleUpload)), {
				loading: 'uploading...',
				success: 'uploaded successfully',
				error: 'Could not upload.'
			});
			await invalidateAll();
		}
   };

   // upload files to firbase
   async function HandleUpload(file: File) {
		const docRef = await addDoc(collection(db, 'files'), {
			uid,
			fileName: file.name,
			size: file.size,
			type: file.type,
			timestamp: serverTimestamp()
		});

		const fileRef = ref(storage, `user/${uid}/files/${docRef.id}`);
		await uploadBytes(fileRef, file);
		const downloadUrl = await getDownloadURL(fileRef);
		await updateDoc(docRef, {
			downloadUrl
		});
	}
</script>

<button class={cn('w-full rounded-lg bg-border/50 h-44 border-4 border-dashed', {
    'bg-primary/50 border-primary': isDragging
})}
on:dragenter|preventDefault={handleDragEnter}
on:dragleave|preventDefault={handleDragLeave}
on:dragover|preventDefault
on:drop|preventDefault={handleDrop}
on:click={handleClick}

>
   {#if isDragging}
    Drop the file here
   {:else}
    Drag and drop a file here or click to add files
   {/if}
   <input bind:this={fileInput} on:change={handleFileSelect} type="file" multiple hidden />
</button>