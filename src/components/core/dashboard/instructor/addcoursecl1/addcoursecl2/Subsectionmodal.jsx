import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Uploadbox from './Uploadbox';
import { useDispatch, useSelector } from 'react-redux';
import Custombutton from '../../../../../common/Custombutton';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { createsubsection, updatesubsection } from '../../../../../../services/Courseservices';

const Subsectionmodal = ({
  seteditmode,
  setcreatemode,
  setviewmode,
  viewmode,
  editmode,
  createmode,
  subsectionmodal,
  setsubsectionmodal,
  sectionid,
}) => {
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.Course);
  const { token } = useSelector((state) => state.Auth);

  const {
    reset,
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const isformupdated = () => {
    const data = getValues();
    return (
      data?.title !== subsectionmodal?.title ||
      data?.description !== subsectionmodal?.description ||
      data?.video !== subsectionmodal?.videourl
    );
  };

  const subsectionsubmithandler = (data) => {
    const formdata = new FormData();
    if (data.title !== subsectionmodal?.title) formdata.append('title', data.title);
    if (data.description !== subsectionmodal?.description) formdata.append('description', data.description);
    if (data.video !== subsectionmodal?.videourl) formdata.append('video', data.video);
    formdata.append('courseid', course._id);
    formdata.append('sectionid', sectionid);

    if (editmode) {
      formdata.append('subsectionid', subsectionmodal._id);
      dispatch(updatesubsection(formdata, token));
    }
    if (createmode) {
      dispatch(createsubsection(formdata, token));
    }

    seteditmode(false);
    setcreatemode(false);
    setsubsectionmodal(null);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (!isformupdated()) return toast.error('No fields are updated');
    handleSubmit(subsectionsubmithandler)();
  };

  useEffect(() => {
    register('video', {
      required: { value: true, message: 'Video is required' },
    });
    if (editmode || viewmode) {
      setValue('title', subsectionmodal.title);
      setValue('description', subsectionmodal.description);
      setValue('video', subsectionmodal.videourl);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 text-black dark:text-white rounded-md border-2 border-yellow-400 p-6 space-y-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            {viewmode && 'View Lecture'}
            {editmode && 'Edit Lecture'}
            {createmode && 'Create Lecture'}
          </h2>
          <button
            onClick={() => {
              setsubsectionmodal(null);
              seteditmode(false);
              setcreatemode(false);
              setviewmode(false);
            }}
            className="text-red-500 text-2xl"
          >
            <RxCross2 />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={onsubmit}>
          {/* Title */}
          <div className={`${viewmode && 'pointer-events-none opacity-70'}`}>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title <sup className="text-red-600">*</sup>
            </label>
            <input
              id="title"
              placeholder="Enter the title"
              className="w-full px-3 py-2 border rounded-sm bg-white dark:bg-slate-800 dark:border-gray-600"
              {...register('title', {
                required: { value: true, message: 'Title is required' },
              })}
            />
            {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className={`${viewmode && 'pointer-events-none opacity-70'}`}>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description <sup className="text-red-600">*</sup>
            </label>
            <input
              id="description"
              placeholder="Enter the description"
              className="w-full px-3 py-2 border rounded-sm bg-white dark:bg-slate-800 dark:border-gray-600"
              {...register('description', {
                required: { value: true, message: 'Description is required' },
              })}
            />
            {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
          </div>

          {/* Video Upload */}
          <Uploadbox
            setValue={setValue}
            errors={errors}
            formfield="video"
            isSubmitSuccessful={isSubmitSuccessful}
            video={true}
            thumbnail={course.thumbnail}
            editdata={subsectionmodal?.videourl}
            viewonly={viewmode}
          />

          {/* Save Button */}
          {!viewmode && (
            <div className="flex justify-end">
              <Custombutton text="Save" styles="bg-yellow-300 text-black hover:bg-yellow-400 dark:hover:bg-yellow-500" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Subsectionmodal;
